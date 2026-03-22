# ============commit: chore: about this project============

HOW TO VIEW THIS PROJECT: Each commit in readme file is actual commit in the repository.

- We are working on step-by-step implementation of google docs system design.
- Starting with bad design of google docs system design, we will improve it step by step.
- Each commit in this repo will have a small improvement in the design pattern.

# ============commit: feat: bad design============

# (ABSTRACTION):

- Responsibility of DocumentEditor is to manage(add,delete,update,get) the document content or elements. But since these content can be anything (text, image, table, etc), following observation can be made:

- A document editor's concern should not be to think, how many types of elements can it get. 

- Also it's should not be concerned, how will different type of elements( text,video,etc..) be rendered, which is obvious because their can be variety of types of content and each type of content would be rendered in different ways. Sometimes this differnce can be huge too.

- This variety of contents, raise need of having a contract (abstract class) for these different contents, and DOCUMENT EDITOR SHOULD BE CONCERNED ONLY ABOUT, WHAT CAN THEY DO, NOT HOW WOULD THEY DO IT ( rendered,processed, etc). These contracts(abstract methods or state), are what, document editor will use in it's code.
Note: these contract or common interface (methods with same name and way of calling), and will be implemented by different types of contents. This is the contract, which document editor will use. What varies is, how will differnt content or elements or subclasses of that abstract class will implement those functionalities, which ofcourse is not concern of document editor.
/* Abstraction standardizes “how you interact”, not “what result you get. But at some intermediate layer where actually methods are called, it may be necessary to interpret the output of methods of elements. This is fulfilled by the contract of same return type (not format)*/


## SINGLE RESPONSIBILITY PRINCIPLE (SRP)
DcoumnetEditor is meant to manage (add, render, or update content) a document. But currently, doing file operations, caring about how differnt types of content will be rendered or created.

# ===============feat: Bad-Design update===============

## OPEN/CLOSED PRINCIPLE (OCP) - single reason to change
- Already written behavior should not change. DcoumentEditor is meant to manage (add, 
  render, or update content) a document. It should only change when internal structure ( like if we start using difffernt ds to store elements) changes.
- But in our case since render method have cases, for each type of content, as new type
  of content is added, we have to modify render method, which violates SRP. 
- Also if rendering text or image will change, we have to modify render methods for them 
  which are defined inside DocumentEditor class, which violates SRP.


