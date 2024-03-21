//Hämtar DOM-element för utskrift
var outputDiv = document.getElementById('output');
//Array som lagrar befintliga kurskoder. Kontroll för att göra varje kurskod unik.
var existingCourseCodes = [];
//Array som lagrar befintliga kurser
var courses = [];
//Funktion för att spara kurser till localStorage
function saveCoursesLocalStorage() {
    localStorage.setItem('courses', JSON.stringify(courses));
}
//Funktion för att lägga till ny kurs
function addCourse() {
    //Hämta in ID från formulär
    var courseCodeInput = document.getElementById('courseCode');
    var courseNameInput = document.getElementById('courseName');
    var courseProgressionInput = document.getElementById('courseProgression');
    var courseUrlInput = document.getElementById('courseURL');
    if (!courseCodeInput || !courseNameInput || !courseProgressionInput || !courseUrlInput) {
        console.error("Ett eller flera formulärelement hittdes ej");
        return;
    }
    //Hämta in värde från formulär
    var code = courseCodeInput.value;
    var name = courseNameInput.value;
    var progression = courseProgressionInput.value;
    var syllabus = courseUrlInput.value;
    //Kontroll för progressionvärden
    if (progression !== 'A' && progression !== 'B' && progression !== 'C') {
        console.error("Ogiltigt progressionsvärde. Endast A, B eller C gäller");
        alert("Endast progressionsvärde A, B eller C gäller");
        return;
    }
    //Kontroll för att säkerställa att kurskod är unik
    if (existingCourseCodes.includes(code)) {
        console.error("Kurskoden är inte unik.");
        alert("Kurskoden är ej unik. Var god väljs annan kurskod.");
        return;
    }
    //Lägg till kurskoden i existingCourseCodes array
    existingCourseCodes.push(code);
    //Skapa kursobjekt utifrån interface och lägg till i array för kurser
    var newCourse = { code: code, name: name, progression: progression, syllabus: syllabus };
    courses.push(newCourse);
    //Visa information om ny kurs
    saveCoursesLocalStorage();
    displayCourse(newCourse);
}
/*****************Test för uppdatering av formulär***********************/
function showUpdateForm(course) {
    var updateFormHTML = " \n    <form id=\"updateForm\">\n            <label for=\"newCourseCode\">Ny kurskod:</label><br>\n            <input id=\"newCourseCode\" type=\"text\" name=\"newCourseCode\" value=\"".concat(course.code, "\"><br>\n            <label for=\"newCourseName\">Nytt kursnamn:</label><br>\n            <input id=\"newCourseName\" type=\"text\" name=\"newCourseName\" value=\"").concat(course.name, "\"><br>\n            <label for=\"newCourseProgression\">Ny kursprogression:</label><br>\n            <input id=\"newCourseProgression\" type=\"text\" name=\"newCourseProgression\" value=\"").concat(course.progression, "\"><br>\n            <label for=\"newCourseURL\">Ny kursl\u00E4nk:</label><br>\n            <input id=\"newCourseURL\" type=\"text\" name=\"newCourseURL\" value=\"").concat(course.syllabus, "\"><br>\n            <input id=\"updateButton\" type=\"button\" value=\"Uppdatera\">\n    </form>\n    ");
    outputDiv.innerHTML = updateFormHTML;
    //Eventlistener för uppdaterar-knappen
    var updateBtn = document.getElementById("updateButton");
    updateBtn.addEventListener("click", function () {
        //Hämta in nya värden
        var newCourseCode = document.getElementById('newCourseCode').value;
        var newCourseName = document.getElementById('newCourseName').value;
        var newCourseProgression = document.getElementById('newCourseProgression').value;
        var newCourseURL = document.getElementById('newCourseURL').value;
        //Uppdatera kursen
        updateCourse(course, newCourseCode, newCourseName, newCourseProgression, newCourseURL);
    });
}
//Funktion för att uppdatera information om kurs
function updateCourse(courseToUpdate, newCode, newName, newProgression, newSyllabus) {
    //Hitta kursen i arrayen av kurser
    var index = courses.findIndex(function (course) { return course.code === courseToUpdate.code; });
    //Uppdatera info
    courses[index].code = newCode;
    courses[index].name = newName;
    courses[index].progression = newProgression;
    courses[index].syllabus = newSyllabus;
    //spara kurs efter uppdatering
    saveCoursesLocalStorage();
    //Visa uppdaterad kursinformation
    displayCourse(courses[index]);
}
//Funktion för att visa kursinformation
function displayCourse(course) {
    //Skapar HTMLsträng med kursinfo
    var courseInfoHTML = "<br><strong>Kurskod:</strong> ".concat(course.code, "<br>, \n    <strong>Kursnamn:</strong> ").concat(course.name, "<br>, \n    <strong>Progression:</strong> ").concat(course.progression, "<br>, \n    <strong>Kursl\u00E4nk:</strong> ").concat(course.syllabus, "<br>\n    <button onclick=\"showUpdateForm(").concat(JSON.stringify(course), ")\">Uppdatera</button><br>\n    ");
    //Lägger till ny kursinfo till befintligt innehåll i output ID
    outputDiv.innerHTML += courseInfoHTML;
}
//Funktion för hämtning av kurser från localStorange
function loadCoursesLocalStorage() {
    var storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
        courses = JSON.parse(storedCourses);
        //Visar kurserna när de hämtats
        courses.forEach(function (course) { return displayCourse(course); });
    }
}
//Ladda kurserna från localStorage när sidan laddas
window.addEventListener('DOMContentLoaded', loadCoursesLocalStorage);
//Hämt ID och sätt Eventlistener för knapp kopplad till funktion 
var submitBtn = document.getElementById("button");
;
submitBtn.addEventListener('click', addCourse);
