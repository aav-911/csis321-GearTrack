# AI Usage Declaration

## AI Tools Used

- **Google Gemini** Used for example code, contextual next steps, and generation of generic blocks of code according to human guidance.
- **OpenAI ChatGPT** Used for checking bugs and logic, as well as color palette and typography
- **Claude** Used for generating tasks and ideas on how to implement GearTrack
- **Codex** Used for checking bugs and logic, as well as help with learning to create a local server for testing. 

## Scope of AI Assistance

AI tools were used to assist with:

- Understanding programming concepts and implementation approaches.
- Identifying potential bugs and troubleshooting errors.
- Reformatting code to reimplement existing structure.
- Teaching new concepts within the context of the software.
## Files with AI generated / assisted code:
- AddEquipment.jsx : Around 25-35% AI assisted, AI was used for assistance in iterative development and realizing
  goals. AI was also used for debugging, primarily with contextually evaluating error messages and catching errors
  with wrong fields. Most AI contributions were copied over "by hand" by the developer primarily responsible for
  AddEquipment, and were generated to adhere to the structure, naming convention, and other attributes of the human
  code. Repetitive tasks such as implementing multiple text input boxed were realized with AI assistance.
- EquipmentList.jsx : Around 45% AI assisted, primarily used to integrate AddEquipment to the page. Since this 
  section is a lot less behavioral nuanced, AI was used more than AddEquipment.jsx. AI was mainly used to for learning
  purposes and figuring out how to display the equipment
- styles.css: Around 35-45% AI assisted, primarily used to learn how to style the website as well as come up with a suitable color palette and typography. 

## Planning + Assigning tasks
- Between 45-65% AI assisted, AI was used as a guide to help make this project possible. AI figured out to implement this idea into code, then generated and edited tasks to assign to other group members. Before assigning tasks, the Project Manager double checks the generated tasks and makes edits suitable for the project. 

## Human Contributions and Verification

The project was primary human coded. All AI usage was heavily guided by a human, and used with context and nuance with the primary objective of using AI as a tool and learning where applicable.

The team remains responsible for the design, implementation, testing, and maintenance of the software. AI or other computer systems can never be held responsible for a mistake, and therefore a human should always be at blame.

## Notes

It is interesting to note that the main source of trouble for AI, both ChatGPT and Google Gemini, was consistant
naming schemes. Especially when troubleshooting Supabase, Gemini was incrediably forgetfull of correct naming of
Supabase column names. Both also seemed to teeter between over-the-top functionallity and the most bare-bones
implementations even with consistant intructions for styling. Furthermore, Gemini was overager to make unneccisary 
changes to existing code even when instructed to _only_ add to the project. 
