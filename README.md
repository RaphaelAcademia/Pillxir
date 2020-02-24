# Pillxir
A web application that transcribes uploaded receipts to track spendings over a period of time

The web application works by transcribing uploaded receipts to text using Tesseract-OCR. Then, the store
name and the total amount of the transaction is sent to a MongoDB database through an API built using ExpressJS and NodeJS. The data is then shown to the user using graphs made with React-Vis. There are currently 4 graphs that the user can choose from: Spendings from the Current Week, Spendings from the Current Month, the Average Spendings of the Week, and the Average Spendings of the Month.

**NOTE: Requires Tesseract-OCR installed and added to the environment variables.
