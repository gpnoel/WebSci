README for lab 8

I used the NewCodersSurvey dataset from kaggle. I used it because it was one of the more interesting ones (in my opinion) that was on the featured list.

There was a lot of information in the dataset, but I chose to focus on the country the person lies in, how long they've been programming for, and the income they receive. The edges connect the country and the time they've been programming for (in months). The income determines the width of the edge.

I honestly had no idea what I was doing for a couple days. I had to go through so many Google searches to figure out that graph_from_data_frame was the easiest way to translate my dataset into a graph. R's documentation is so verbose it is so hard to get into. Also the syntax for the language is really bad compared to the languages I'm used to writing in. I hope to never touch R again for the rest of my life. Really, I overcame them by looking at the examples from google searches and tried ot understand what each character in each line was doing. Obvious but just glancing and looking at the overall picture did not work for me.

The sources I used were:
http://kateto.net/network-visualization
http://www.r-tutor.com/r-introduction/vector/combining-vectors
http://stackoverflow.com/questions/10085806/extracting-specific-columns-from-a-data-frame