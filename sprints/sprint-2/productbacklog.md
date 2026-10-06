| Story ID     | Header 2      | Priority | Story Points | Dependencies |
| :-----------:| :------------ | :------: | :----------: | :-----------: |
| GT01 | As an MPS Supervisor, I need to be able to see and organize our equipment inventory so that I can prepare for an upcoming event. | Highest | 8 | None |
| GT02  |As an MPS Student Worker, I need to be able to submit entries of equipment data and its location so that my supervisor can see where the equipment is stored.| High | 5 | GT01 |
| GT03 | As an MPS Supervisor, I need to be able to find the relevant equipment’s location so that I can prepare for upcoming events. | High | 5 | GT01 |
| GT04 | As an MPS Supervisor, I need to be able to see which equipment needs troubleshooting so that I can fix the equipment before the event it’s needed at. | Medium | 3 | GT01 |
| GT05 | As an MPS Student Worker, I need to submit a report in case certain equipment stops working so that my supervisor can see what needs to be fixed. | Medium | 3 | GT01, GT02 |

### Breakdown
We determined the story points based on a few metrics, including projected difficulty, time
commitment, logical progression, and, of course, dependencies' interaction. We assumed the person with the skills most
suitable for each issue would be assigned to it. Since our prior experience is limited, issues that require new skills 
(SQL for Supabase, HTML/CSS/React/ect.)
<br>

We selected priority around the basic functionality and 
utility of the software; core functionality is prioritized, and by virtue of complexity tends to also have 
higher story points. Saving lower story-point issues for later/last allows us to continuously troubleshoot
and bug fix previous code and developments.

