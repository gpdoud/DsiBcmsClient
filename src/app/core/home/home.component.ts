import { Component, OnInit } from '@angular/core';
import { SystemService } from '@system/system.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  get userIsRootAdminOrInstructor() { return this.sys.userIsRootAdminOrInstructor; }

  staffHelp = {
    left: [
      {
        section: "Adding Students to BCMS (STAFF ONLY)",
        paragraphs: [
          `When a student officially enrolls in a cohort, the student must be added to BCMS
            as a user. `,

          `Select 'Users' from the menu. It will display a list of all the active users. Click
            on the 'Create' link at the top left and the 'User Create' dialog will display. `,

          `Enter the first name and last name in the 'Name' textboxes. This will create a
            'Username' by taking the first initial of the first name and the entire last name 
             as the default username. For example, if the first name is 'Noah' and the last name
             is 'Phence' the username will default to 'nphence'.`,

          `The 'Password' field is automatically filled with 'Train@MAX' but it could be changed 
            if needed.`,

          `Enter the 'Email' and 'Cell/Work Phone' numbers in the next text boxes.`,

          `The 'Role' should default to 'Student' but, if for some reason it is different, 
            drop down the list and select 'Student'.`,

          `Click the 'Save' button and you should be returned to the user list.`
        ]
      },
      {
        section: "Adding Cohorts (STAFF ONLY)",
        paragraphs: [
          `Cohorts can be added by selecting 'Cohorts' from the menu then click 'Create'.`,

          `The 'Name' of the cohort, by convention, starts with the starting date then 
            the type of cohort follows the data. For example, for a coding bootcamp that
            starts on May 15, 2025, the name would likely be '05/15/2025 FT Coding Bootcamp'.`,

          `The instructor(s) will be added later after the cohort has been created.`,

          `The Begin, End, and Demo dates are easily selected by clicking on the mini calendar
            then navigating to the year and month then clicking on the day.`,

          `The 'Active' checkbox should be checked by default and should remain checked.`,

          `The 'Capacity' defines the maximum number of students in the class.`,

          `Click on the 'Save' button then you'll be returned to the 'Cohort list'`,

          `Once the cohort is created, click on the 'Inst' action item to add one or more
            instructors. Then click <span class='fw-bold text-success'>Add</span> button
            to display a drop-down list of instructors. Click on the list to display all 
            the instructors then click on one instructor to be added to the cohort then 
            click the 'Save' button. You'll be returned to the display of instructors for 
            the cohort. Repeat that process to add additional instructors.`,

          `<span class='fst-italic'>NOTE: All instructors assigned to the cohort can perform
            all the functions avilable to an instructor even if that instructor is not teaching
            at the time.</span>`,

          `<span class='font-weight-bold fst-italic text-danger'>NOTE: Do not select the same instructor multiple times
            for a cohort! It will cause problems with the system.</span>`,
        ]
      },
      {
        section: "Cohorts Enrollment (STAFF ONLY)",
        paragraphs: [
          `To enroll students in a cohort, the students must have been added as 'Users' in 
            the BCMS system. Then, to enroll a student in a corhort, click on 'Cohorts' then 
            click on the 'Enrll' next to the cohort the student will be enrolled in.`,

          `The 'Enrollment List' displays some detail about the cohort like the name, the start
            and end dates, the capacity of the class and the current number of students enrolled
            in the cohort.`,

          `The next list are the students enrolled in the cohort. To remove a student previously
            enrolled, click 'Drop'.`,
          
          `To enroll a new student, scroll through the list of 'Not Enrolled' students. When 
            you find the student to be enrolled, just click 'Enroll' and the student will be 
            displayed in the list of enrolled students. The number of students currently enrolled
            should be increased by 1.`,
          
          `Note: be sure not to enroll a student that is already enrolled in another cohort.`
        ]
      },
      {
        section: "Viewing a Student's Assessment Scores (STAFF ONLY)",
        paragraphs: [
          `To view all the current assessment scores for students, click on 'Cohorts' then click 
            'Asmts' action next to the cohort. This will display all the students and all their
            assessment scores grouped by default by description. There are two different ways to
            see all the scores for a particular student.`,

          `First, click on the 'Student' column heading to sort all the data by student. This will
            group the data by student showing all their assessments to date. Just scroll through
            the list to find the student you want.`,

          `Second, if you only want to see a particular student, enter some of the student's 
            first or last names in the 'Search' box next to the 'Back to list...'. This will
            limit the rows to only those that contain the search characters you entered. So if
            you wanted to see only Mary Jones, is probably best to put 'Jones' in the search
            box.`
        ]
      },
    ],
    right: [
      {
        section: "Reviewing student attendance (STAFF ONLY)",
        paragraphs: [
          "BCMS will keep a record of all student's attendance and there is a report available to " +
          " staff and instructors that will show all the students attendance up to the current date.",
          
          "Select <span class='font-weight-bold'>'Cohorts'</span> then <span class='font-weight-bold'>'Rpt'</span> " +
          " for the particular cohort. The report allows searching for particular students and/or " +
          " limiting the date range.",
          
          "The report will show the attendance for each student in date sequence and showing each  " +
          " day the check in and check out times. It will also display any notes entered by the student  " +
          " and it will display the excused, absent, and secure note enterd by staff or instructors. If  " +
          " the 'Out' column is blank, it means the student did not check out for that day. If a normal " +
          " class day is missing, there was no check in or check out for that day."
        ]
      },
      {
        section: "Monitoring daily cohort attendance (STAFF ONLY)",
        paragraphs: [
          "Because at times, a full-time class instructor can get busy working with students " +
          " in the morning and the afternnon, it can be difficult for the instructor to keep track  " +
          " of the students " +
          " that are checking into class on time. Any administrator can view a page in BCMS that " +
          " will show all the students and their status of being checked in or out.",
          
          "Start by clicking on <span class='font-weight-bold'>'Cohorts'</span> in the menu. Then" +
          " click on the <span class='font-weight-bold'>'ChkIO'</span> like on the particular cohort to" +
          "     be monitored. This will display a page that shows each student in a box colored " +
          "     <span class='font-weight-bold text-secondary'>grey</span>, " +
          "     <span class='font-weight-bold text-success'>green</span>, or " +
          "     <span class='font-weight-bold text-warning'>yellow</span>.",
          
          "When the color of the box is grey, it means the student is NOT checked in. When the colored " +
          " is green, it means the student checked in before the 9:15 AM (grace period). If the box " +
          " is yellow, it means the student did check in but it was after 9:15 AM.",

          "The administrator or instructor can check a student in or out by simply clicking on " +
          " box then clicking the check-in or check-out button.",
          
          "When checking a student does not attend class for any reason, the student should be " +
          " marked absent by clicking the <span class='font-weight-bold'>'Absent'</span> checkbox. ",

          "When checking a student does not attend class for valid personal or health reasons and " +
          " notifies MAX, the student should be marked exclosed by clicking the  " +
          " <span class='font-weight-bold'>'Absent'</span> checkbox. ",
          
          "There is a textbox for a secured note viewable only by staff and instructors where information " +
          " can be entered and shown on the attendance report."
        ]
      },
      {
        section: "Creating Assessments (formally Evaluations) (STAFF ONLY)",
        paragraphs: [
          `The assessments are the tests that students must pass with 80 points in order to graduate
            from the cohort. Assessments can be made for any topic. There can be any number of 
            questions that will be multiple choice or true and false. Each question can be assigned
            any number of points and questions can be marked as 'Bonus' questions.`,

          `To create an assessment, click on 'Evals(a)' which is for adminstrators and instructors
            only then click the 'Create' link at the top left.`,

          `The 'Evaluation Create' requires only a description of the assessment and the time
             limit in minutes and seconds. Also, make sure to check the 'Template' checkbox.
             That designates the assessment as one that can be copied and assigned to students.
             Click the 'Save' button when finished.`,

          `Once the assessment has been created, click the 'Quests' action item from the 
            'Evaluation list'. This will display the page that allows creating the questions
            that will be presented on the text along with the designated correct answer. Click
            'Create' to create a new question.`,

          `When creating a question, start by filling in the 'Category' textbox. It is just
            some text that helps the creator keep track of questions types in the assessment.
            Next, give it a point value. A point value of 10 is typical for a test that will
            have 10 questions. The point values of all the non-Bonus questions should add up
            to 100 points. A question marked 'Bonus' is not added to that total.`,

          `Next the question text goes in the 'Question' textbox. It must be all text with no
            formatting or html.`,

          `Text boxes A, B, C, D, and E are the possible answers. Only A & B are required. The
            'Answer' drop-down defines which answer is the correct one.`,

          `The 'Is Bonus' checkbox designates the question as a bonus and it is not added to 
            total number of points. So if an assessment has 10 questions each worth 10 points,
            there will be 100 points possible. An 11th question worth 10 points but marked as
            a bonus question means a student getting all the question correct would get 110 
            points even though only 100 were listed as available.`,

          `Click the 'Save' button when done with the question. Repeat adding as many questions
            as needed.`
        ]
      }
    ],
  }
  
  studentsHelp = {
    left: [
      {
        section: "Taking Assessments",
        paragraphs: [
          "Assessments test that checks a student's knowledge of a general topic presentedin the cohort. " +
          " Passing all assessments is a requirement for graduation.",

          "Most assessments are 10 multiple choice or true and false questions " +
          " and may include a bonus question. Each question has a point value and there are " +
          " at least 100 points available. 80 points are required to pass the assessment.  " +
          " If a student does not attain the 80 points, there is a remedial assessment that " +
          " will be required. Any questions not answered are incorrect.",

          "If the instructor assigns an assessment and the student does not see it in the " +
          " 'Evals' menu item, the student should simply navigate to the 'BCMS' menu item " +
          " then navigate back to 'Evals'. The assessment should be in the list.",

          " Assessments will be assigned to students and are available under the  " +
            " <span class='font-weight-bold'>Evals</span> menu item. The Evaluations List  " +
            " will show all the assessments already taken plus any recently assigned. It shows " +
            " the number of questions, the time limit, and, if the assessment is complete, the  " +
            " score. Under the <span class='font-weight-bold'>Actions</span> column, there will " +
            " be a link that says <span class='font-weight-bold text-primary'>Take</span> to  " +
            " take the assessment and <span class='font-weight-bold'>Review</span> to review " +
            " an assessment already completed. ",
      
          " When reviewing an assessment, all the questions and answers are displayed. If a " +
            " question was answered correctly, the question and the correct answer are displayed " +
            " in <span class='font-weight-bold text-success'>green</span>. If a question was answered  " +
            " incorrectly, the question and the student's  " +
            " answer is displayed in <span class='font-weight-bold text-danger'>red</span> with  " +
            " the correct answer displayed in <span class='font-weight-bold text-success'>green</span>.  " +
            " The point value of the question is displayed on the right. ",
      
          "If a student believes that they answered a question correctly but the question was " +
            " marked incorrect, the student should notify the instructor."
      
        ]
      },
      {
        section: "Reviewing your assessment scores",
        paragraphs: [
          "Students can check on all their current scores for their assessments by clicking " +
          " the <span class='font-weight-bold'>Asmnts</span>. This page will display all your " +
          " completed assessments and the scores for each. An example of the scores is displayed " +
          " below."
        ]
      }
    ],
    right: [
      {
        section: "Checking in and out",
        paragraphs: [
          "To check in or out of BCMS, click the <span class='font-weight-bold'>CheckIn/Out</span> " +
            " menu item. A dialog box will display with a message that the student is currently " +
            " 'checked-in' or 'checked-out'. There is a Note text box where students can enter " +
            " messages when coming to class late or leaving class early. No note is needed if  " +
            " checking in on-time or checking-out after class ends. Click the blue button which " +
            " displays the student will 'Check-in' or 'Check-out'.",

          "A student can click the <span class='font-weight-bold'>'CheckIn/Out'</span> " +
            " menu item to see if they are currently checked in or out.",
      
          "BCMS tracks the attendance of students. It does so by requiring the " +
            " students to <span class='font-weight-bold>'check-in'</span> at the beginning" +
            " of class and <span class='font-weight-bold'>'check-out'</span> at the end. BCMS" +
            " will keep track of the times a student is checked in and out.",
      
          "In the morning boot camps, students are required to check-in by 9:00 AM." +
            " BCMS will allow a 15 minute grace period were the students checking-in by" +
            " 9:15 AM will still be considered on time. After that grace period, a student" +
            " is considered <span class='font-weight-bold'>'late'</span> for class. There are " +
            " state board requirements for attendance and an excessive number of late " +
            " arrivals may result in dismissal from the cohort."
    
        ]
      }
    ]
  }

  constructor(
    private sys: SystemService
  ) { }

  ngOnInit() {
  }

}
