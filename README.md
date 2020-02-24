# Pillxir
A web application that transcribes uploaded receipts to track spendings over a period of time

The web application works by transcribing uploaded receipts to text using Tesseract-OCR. Then, the store
name and the total amount of the transaction is sent to a MongoDB database through an API built using ExpressJS and NodeJS. The data is then shown to the user using graphs made with React-Vis. There are currently 4 graphs that the user can choose from: Spendings from the Current Week, Spendings from the Current Month, the Average Spendings of the Current Week, and the Average Spendings of the Current Month.

Screenshots of the Application: 
![UploadingImage](https://user-images.githubusercontent.com/45577362/75127838-58e5f900-568f-11ea-91c3-2712f3f8d2bb.png)
![Weekly Graph](https://user-images.githubusercontent.com/45577362/75127944-c1cd7100-568f-11ea-9375-dd010929d7a3.png)
![Average Monthly Graph](https://user-images.githubusercontent.com/45577362/75127968-e0336c80-568f-11ea-844a-c8a505b42759.png)

**NOTE: Requires Tesseract-OCR installed and added to the environment variables.
