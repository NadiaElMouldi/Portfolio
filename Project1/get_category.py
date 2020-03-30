import csv

with open('grades.csv') as csvfile:
    lines = csv.DictReader(csvfile)
    for line in lines:
        with open('rating_cat.csv', mode='a') as rating_file:
            if (line['rating'] > "1" and line['rating'] <="2.5"):
                                rating_writer = csv.writer(rating_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
                                rating_writer.writerow(['2-2.5'])
            elif (line['rating'] > "2.5" and line['rating'] <= "3.5"):
                                rating_writer = csv.writer(rating_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
                                rating_writer.writerow(['3.3.5'])
            elif (line['rating'] > "3.5" and line['rating'] <= "4.5"):
                                rating_writer = csv.writer(rating_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
                                rating_writer.writerow(['4-4.5'])
            else:
                                rating_writer = csv.writer(rating_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
                                rating_writer.writerow([line['rating']])

                
