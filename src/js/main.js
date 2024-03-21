//Hämt in ID från HTML?
//Lägg till eventlistener?
//Skriv ut till DOM?
//Använd localstorage för att spara och hämta information när sidan laddas
//Hämtar DOM-element för utskrift
var outputDiv = document.getElementById('output');
//Funktion för att lägga till ny kurs
function addCourse() {
    //Hämta in ID från formulär
    var courseCodeInput = document.getElementById('courseCode');
    var courseNameInput = document.getElementById('courseName');
    var courseProgressionInput = document.getElementById('courseProgression');
    var courseUrlInput = document.getElementById('courseUrl');
    //Hämta in värde från formulär
    var code = courseCodeInput.value;
    var name = courseNameInput.value;
    var progression = courseProgressionInput.value;
    var syllabus = courseUrlInput.value;
    //Skapa kursobjekt utifrån interface
    var course = { code: code, name: name, progression: progression, syllabus: syllabus };
    //Skriv ut kursinformation
    outputDiv.textContent = "Kurskod: ".concat(course.code, ", Kursnamn: ").concat(course.name, ", Progression: ").concat(course.progression, ", Kursl\u00E4nk: ").concat(course.syllabus);
}
//Hämt ID och sätt Eventlistener för knapp kopplad till funktion 
var submitBtn = document.getElementById("button");
;
submitBtn.addEventListener('click', addCourse);
