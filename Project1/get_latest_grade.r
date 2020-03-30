library(readr)
library(tidyverse)

##loading data
data <- read_csv("C:/Users/Nadia/portfolio/Project1/DOHMH.csv",col_types  =  cols(ZIPCODE = col_character()))

#Filter on inspection type, score, grade
Inspections <- data %>%
  filter((`INSPECTION TYPE` %in% 
            c('Cycle Inspection / Re-inspection'
              ,'Pre-permit (Operational) / Re-inspection')
          |(`INSPECTION TYPE` %in%
              c('Cycle Inspection / Initial Inspection'
                ,'Pre-permit (Operational) / Initial Inspection')) 
          & SCORE <= 13)
         | (`INSPECTION TYPE` %in%  
              c('Pre-permit (Operational) / Reopening Inspection'
                ,'Cycle Inspection / Reopening Inspection'))
         & GRADE %in% c('A', 'B', 'C', 'P', 'Z')) %>%
  
  select(CAMIS,`INSPECTION DATE`)

#Select distinct inspections
Inspections_Distinct <- distinct(Inspections)

#Select most recent inspection date
MostRecentInsp <- Inspections_Distinct %>%
  group_by(CAMIS) %>%
  slice(which.max(as.Date(`INSPECTION DATE`,'%m/%d/%Y')))

#Join most recent inspection with original dataset
inner_join(data,MostRecentInsp, by = "CAMIS","INSPECTION DATE")

#Select restaurant inspection data based on most recent inspection date
Final <- data %>% inner_join(MostRecentInsp) %>%
  filter((`INSPECTION TYPE` %in% 
            c('Cycle Inspection / Re-inspection'
              ,'Pre-permit (Operational) / Re-inspection'
              , 'Pre-permit (Operational) / Reopening Inspection' 
              ,'Cycle Inspection / Reopening Inspection')
          |(`INSPECTION TYPE` %in%
              c('Cycle Inspection / Initial Inspection'
                ,'Pre-permit (Operational) / Initial Inspection')) 
          & SCORE <= 13 )) %>%
  
  select(CAMIS,DBA,`INSPECTION DATE`,GRADE,`INSPECTION TYPE`,SCORE,BORO, BUILDING, STREET, Latitude, Longitude, `CUISINE DESCRIPTION`, `VIOLATION CODE`, `VIOLATION DESCRIPTION`,`CRITICAL FLAG`)

##distinct Restaurant Inspection Data

Final <- Final[!(Final$Latitude == "NA"),]
Final <- distinct(Final)

write.csv(Final, "C:/Users/Nadia/portfolio/Project1/latest_grade.csv")

Final

table(Final$GRADE)
write.csv(Final$GRADE, "C:/Users/Nadia/portfolio/Project1/counts.csv")

