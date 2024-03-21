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
    const courseUrlInput = document.getElementById('courseURL') as HTMLInputElement;

    if(!courseCodeInput || !courseNameInput || !courseProgressionInput || !courseUrlInput) {
        console.error("Ett eller flera formulärelement hittdes ej");
        return;
    }

    //Hämta in värde från formulär
    const code = courseCodeInput.value;
    const name = courseNameInput.value;
    const progression = courseProgressionInput.value;
    const syllabus = courseUrlInput.value;

    //Kontroll för progressionvärden
    if(progression !== 'A' && progression !== 'B' && progression !== 'C') {
        console.error("Ogiltigt progressionsvärde. Endast A, B eller C gäller");
        alert("Endast progressionsvärde A, B eller C gäller");
        return;
    }

//Skapa kursobjekt utifrån interface
const course: CourseInfo = {code:code, name:name, progression:progression, syllabus:syllabus};

//Skriv ut kursinformation
outputDiv.innerHTML = `<strong>Kurskod:</strong> ${course.code}, <strong>Kursnamn:</strong> ${course.name}, <strong>Progression:</strong> ${course.progression}, <strong>Kurslänk:</strong> ${course.syllabus}`;
}

//Hämt ID och sätt Eventlistener för knapp kopplad till funktion 
const submitBtn = document.getElementById("button") as HTMLButtonElement;;
submitBtn.addEventListener('click', addCourse);
