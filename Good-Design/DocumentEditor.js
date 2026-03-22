const fs = require('fs');

/**
 * Abstraction for document elements
 */
class DocumentElement {
    render() {
        throw new Error("render() must be implemented");
    }
}

/**
 * Text Element
 */
class TextElement extends DocumentElement {
    constructor(text) {
        super();
        this.text = text;
    }

    render() {
        return this.text;
    }
}

/**
 * Image Element
 */
class ImageElement extends DocumentElement {
    constructor(imagePath) {
        super();
        this.imagePath = imagePath;
    }

    render() {
        return `[Image: ${this.imagePath}]`;
    }
}

/**
 * New Line Element
 */
class NewLineElement extends DocumentElement {
    render() {
        return "\n";
    }
}

/**
 * Tab Space Element
 */
class TabSpaceElement extends DocumentElement {
    render() {
        return "\t";
    }
}

/**
 * Document class
 */
class Document {
    constructor() {
        this.documentElements = [];
    }

    addElement(element) {
        this.documentElements.push(element);
    }

    render() {
        return this.documentElements.map(e => e.render()).join('');
    }
}

/**
 * Persistence abstraction
 */
class Persistence {
    save(data) {
        throw new Error("save() must be implemented");
    }
}

/**
 * FileStorage implementation
 */
class FileStorage extends Persistence {
    save(data) {
        try {
            fs.writeFileSync("document.txt", data);
            console.log("Document saved to document.txt");
        } catch (err) {
            console.error("Error writing file:", err);
        }
    }
}

/**
 * DBStorage (placeholder)
 */
class DBStorage extends Persistence {
    save(data) {
        // Save to DB (not implemented)
        console.log("Saving to DB...");
    }
}

/**
 * DocumentEditor
 */
class DocumentEditor {
    constructor(document, storage) {
        this.document = document;
        this.storage = storage;
        this.renderedDocument = "";
    }

    addText(text) {
        this.document.addElement(new TextElement(text));
    }

    addImage(imagePath) {
        this.document.addElement(new ImageElement(imagePath));
    }

    addNewLine() {
        this.document.addElement(new NewLineElement());
    }

    addTabSpace() {
        this.document.addElement(new TabSpaceElement());
    }

    renderDocument() {
        if (!this.renderedDocument) {
            this.renderedDocument = this.document.render();
        }
        return this.renderedDocument;
    }

    saveDocument() {
        this.storage.save(this.renderDocument());
    }
}

/**
 * Client code
 */
const document = new Document();
const persistence = new FileStorage();

const editor = new DocumentEditor(document, persistence);

editor.addText("Hello, world!");
editor.addNewLine();
editor.addText("This is a real-world document editor example.");
editor.addNewLine();
editor.addTabSpace();
editor.addText("Indented text after a tab space.");
editor.addNewLine();
editor.addImage("picture.jpg");

console.log(editor.renderDocument());

editor.saveDocument();