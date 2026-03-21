const fs = require('fs');

class DocumentEditor {
    constructor() {
        this.documentElements = [];
        this.renderedDocument = "";
    }

    // Adds text
    addText(text) {
        this.documentElements.push(text);
    }

    // Adds image (file path)
    addImage(imagePath) {
        this.documentElements.push(imagePath);
    }

    // Render document
    renderDocument() {
        
            let result = "";

            for (let element of this.documentElements) {
                if (
                    element.length > 4 &&
                    (element.endsWith(".jpg") || element.endsWith(".png"))
                ) {
                    result += `[Image: ${element}]\n`;
                } else {
                    result += `${element}\n`;
                }
            }

            this.renderedDocument = result;
        

        return this.renderedDocument;
    }

    // Save to file
    saveToFile() {
        try {
            fs.writeFileSync("document.txt", this.renderDocument());
            console.log("Document saved to document.txt");
        } catch (err) {
            console.log("Error: Unable to write file.", err);
        }
    }
}

// Usage. #client-side
const editor = new DocumentEditor();
editor.addText("Hello, world!");
editor.addImage("picture.jpg");
editor.addText("This is a document editor.");

console.log(editor.renderDocument());


editor.addText("byee byee world!");
editor.addImage("image.jpg");
editor.addText("This is a very good document.");

console.log(editor.renderDocument());

editor.saveToFile();