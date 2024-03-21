interface CourseInfo {
    code: string;
    name: string;
    progression: string;
    syllabus: string;
}

//Hämtar DOM-element för utskrift
const outputDiv = document.getElementById('output') as HTMLDivElement;

//Array som lagrar befintliga kurskoder. Kontroll för att göra varje kurskod unik.
const existingCourseCodes: string [] = [];

//Array som lagrar befintliga kurser
let courses: CourseInfo[] = [];

//Funktion för att spara kurser till localStorage
function saveCoursesLocalStorage(){
    localStorage.setItem('courses', JSON.stringify(courses));
}

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

    //Kontroll för att säkerställa att kurskod är unik
    if(existingCourseCodes.includes(code)) {
        console.error("Kurskoden är inte unik.");
        alert("Kurskoden är ej unik. Var god väljs annan");
        return;
    }

//Skapa kursobjekt utifrån interface och lägg till i array för kurser
let newCourse: CourseInfo = {code:code, name:name, progression:progression, syllabus:syllabus};
courses.push(newCourse);

//Visa information om ny kurs
saveCoursesLocalStorage();
displayCourse(newCourse);
}

//Funktion för att visa kursinformation
function displayCourse(course: CourseInfo) {
//Skapar HTMLsträng med kursinfo
const courseInfoHTML = `<br><strong>Kurskod:</strong> ${course.code}<br>, <strong>Kursnamn:</strong> ${course.name}<br>, <strong>Progression:</strong> ${course.progression}<br>, <strong>Kurslänk:</strong> ${course.syllabus}<br>`;
//Lägger till ny kursinfo till befintligt innehåll i output ID
outputDiv.innerHTML += courseInfoHTML;
}

//Funktion för att uppdatera information om kurs
function updateCourse(courseToUpdate: CourseInfo, newName:string, newProgression: string, newSyllabus: string) {
//Hitta kursen i arrayen av kurser
const index = courses.findIndex(course => course.code === courseToUpdate.code);

//Uppdatera info
courses[index].name = newName;
courses[index].progression = newProgression;
courses[index].syllabus = newSyllabus;

//spara kurs efter uppdatering
saveCoursesLocalStorage();

//Visa uppdaterad kursinformation
displayCourse(courses[index]);

}

//Funktion för hämtning av kurser från localStorange
function loadCoursesLocalStorage(){
    const storedCourses = localStorage.getItem('courses');
    if(storedCourses) {
        courses = JSON.parse(storedCourses);
    }
}

//Ladda kurserna från localStorage när sidan laddas
window.addEventListener('DOMContentLoaded', loadCoursesLocalStorage);

//Hämt ID och sätt Eventlistener för knapp kopplad till funktion 
const submitBtn = document.getElementById("button") as HTMLButtonElement;;
submitBtn.addEventListener('click', addCourse);
