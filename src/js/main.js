// Skapa en klass för att hantera kurser
var CourseManager = /** @class */ (function () {
    // Konstruktor för att skapa ett CourseManager-objekt
    function CourseManager() {
        // Hämta lagrade kurser från localStorage om det finns, annars skapa en tom lista
        var storedCourses = localStorage.getItem('courses');
        if (storedCourses !== null) {
            this.courses = JSON.parse(storedCourses);
        }
        else {
            this.courses = [];
        }
        // Visa kurserna på sidan när den laddas
        this.renderCourses();
    }
    /*----------------FUNKTION FÖR ATT LÄGGA TILL KURS-------------------*/
    // Funktion för att lägga till en ny kurs
    CourseManager.prototype.addCourse = function (form) {
        // Skapa en ny kurs med informationen från formuläret
        var newCourse = {
            code: form.code.value.trim().toUpperCase(),
            name: form.querySelector('#name').value.trim(),
            progression: form.progression.value.trim().toUpperCase(), // Använt trim() och toUpperCase() för att standardisera värdet
            syllabus: form.syllabus.value.trim()
        };
        // Loggar värdet på newCourse.coe
        console.log("New Course Code:", newCourse.code);
        // Kontroll för att säkerställa att kurskod är unik
        if (this.courses.some(function (course) { return course.code === newCourse.code.trim().toUpperCase(); })) {
            console.error("Kurskoden är inte unik.");
            alert("Kurskoden är inte unik. Var god välj annan kurskod.");
            return;
        }
        // Kontroll för progressionvärden
        var newProgression = form.progression.value.trim().toUpperCase();
        if (newProgression !== 'A' && newProgression !== 'B' && newProgression !== 'C') {
            console.error("Ogiltigt progressionsvärde. Endast A, B eller C gäller");
            alert("Endast progressionsvärde A, B eller C gäller");
            return;
        }
        // Lägg till den nya kursen i listan över kurser
        this.courses.push(newCourse);
        // Spara kurserna i localStorage
        this.saveCourses();
        // Uppdatera sidan för att visa den nya kursen
        this.renderCourses();
    };
    /*----------------------FUNKTION FÖR ATT ÄNDRA KURS-----------------*/
    // Funktion för att uppdatera informationen för en befintlig kurs
    CourseManager.prototype.updateCourse = function (courseCode, newProgression) {
        //Kontroll ifall progression stämmer
        if (['A', 'B', 'C'].indexOf(newProgression.trim().toUpperCase()) === -1) {
            console.error("Fel progressionsvärde. A, B eller C gäller.");
            alert("Fel progressionsvärde. A, B eller C gäller.");
            return;
        }
        // Loopa igenom alla kurser för att hitta den som ska uppdateras
        for (var i = 0; i < this.courses.length; i++) {
            // Om kurskoden matchar, uppdatera progressionen för kursen
            if (this.courses[i].code === courseCode) {
                this.courses[i].progression = newProgression;
                break;
            }
        }
        // Spara kurserna i localStorage
        this.saveCourses();
        // Uppdatera sidan för att visa ändringarna
        this.renderCourses();
    };
    /*--------------FUNKTION FÖR ATT TA BORT KURS-------------------------*/
    // Funktion för att ta bort en kurs
    CourseManager.prototype.removeCourse = function (courseCode) {
        // Filtrera ut den kurs som ska tas bort och uppdatera kurslistan
        this.courses = this.courses.filter(function (course) { return course.code !== courseCode; });
        this.saveCourses();
        this.renderCourses();
    };
    /*----------------FUNKTION FÖR ATT SPARA KURSER I LOCALSTORAGE--------*/
    // Funktion för att spara kurserna i localStorage
    CourseManager.prototype.saveCourses = function () {
        localStorage.setItem('courses', JSON.stringify(this.courses));
    };
    /*--------------------------FUNKTION FÖR ATT VISA KURSER I DOM---------------------------*/
    // Funktion för att visa kurserna på sidan
    CourseManager.prototype.renderCourses = function () {
        var _this = this;
        var coursesListElement = document.getElementById('coursesList');
        if (coursesListElement !== null) {
            // Rensa innehållet innan kurserna läggs till
            coursesListElement.innerHTML = '';
            // Loopa igenom alla kurser och skapa HTML-element för varje kurs samt knapp för radering av kurs
            this.courses.forEach(function (course) {
                var courseElement = document.createElement('div');
                courseElement.innerHTML = "\n                        <h3>Kurskod: ".concat(course.code, "</h3>\n                        <p>Kursnamn: ").concat(course.name, "</p>\n                        <p>Progression: ").concat(course.progression, "</p>\n                        <p>Syllabus: ").concat(course.syllabus, "</p>\n                        <button class=\"remove-btn\" data-code=\"").concat(course.code, "\">Ta bort kurs</button> \n                    ");
                // Lägg till en händelselyssnare för att ta bort kursen när knappen klickas på
                var removeButton = courseElement.querySelector('.remove-btn');
                if (removeButton !== null) {
                    removeButton.addEventListener('click', function () {
                        var courseCode = removeButton.dataset.code;
                        if (courseCode) {
                            _this.removeCourse(courseCode);
                        }
                    });
                }
                // Lägg till kursens HTML-element i DOM:en
                coursesListElement.appendChild(courseElement);
            });
        }
    };
    return CourseManager;
}());
/*------------------HÄNDELSELYSSNARE PÅ FORMULÄR FÖR ATT LÄGGA TILL KURS-----------------------------------*/
// Skapa ett CourseManager-objekt
var courseManager = new CourseManager();
// Hämta formuläret för att lägga till en ny kurs
var addCourseForm = document.getElementById('addCourseForm');
// Eventlyssnare på formuläret för att lägga till en ny kurs
addCourseForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Förhindra att sidan laddas om när formuläret skickas in
    courseManager.addCourse(addCourseForm); // Anropa funktionen för att lägga till kursen
    addCourseForm.reset(); // Rensa formuläret efter att kursen har lagts till
});
/*-------------------HÄNDELSELYSSNARE PÅ FORMULÄR FÖR ATT ÄNDRA KURS------------------------------------*/
// Hämta formuläret för att ändra en befintlig kurs
var updateCourseForm = document.getElementById('updateCourseForm');
// Eventlyssnare på formuläret för att ändra en befintlig kurs
updateCourseForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Förhindra att sidan laddas om när formuläret skickas in
    // Hämta kurskoden och den nya progressionen från formuläret
    var courseCodeInput = updateCourseForm.courseCode;
    var newProgressionInput = updateCourseForm.newProgression;
    var courseCode = courseCodeInput.value;
    var newProgression = newProgressionInput.value;
    // Anropa funktionen för att uppdatera kursen med den nya progressionen
    courseManager.updateCourse(courseCode, newProgression);
    // Rensa formuläret efter att kursen har uppdaterats
    updateCourseForm.reset();
});
