interface CourseInfo {
    code: string;
    name: string;
    progression: string;
    syllabus: string;
}

//Hämt in ID från HTML?
//Lägg till eventlistener?
//Skriv ut till DOM?
//Använd localstorage för att spara och hämta information när sidan laddas


//Hämtar DOM-element för utskrift
const outputDiv = document.getElementById('output') as HTMLDivElement;

//Funktion för att lägga till ny kurs
function addCourse() {

    //Hämta in ID från formulär
    const courseCodeInput = document.getElementById('courseCode') as HTMLInputElement;
    const courseNameInput = document.getElementById('courseName') as HTMLInputElement;
    const courseProgressionInput = document.getElementById('courseProgression') as HTMLInputElement;
    const courseUrlInput = document.getElementById('courseUrl') as HTMLInputElement;

    //Hämta in värde från formulär
    const code = courseCodeInput.value;
    const name = courseNameInput.value;
    const progression = courseProgressionInput.value;
    const syllabus = courseUrlInput.value;

//Skapa kursobjekt utifrån interface
const course: CourseInfo = {code:code, name:name, progression:progression, syllabus:syllabus};

//Skriv ut kursinformation
outputDiv.textContent = `Kurskod: ${course.code}, Kursnamn: ${course.name}, Progression: ${course.progression}, Kurslänk: ${course.syllabus}`;
}



//Hämt ID och sätt Eventlistener för knapp kopplad till funktion 
const submitBtn = document.getElementById("button");
submitBtn.addEventListener('click', addCourse);