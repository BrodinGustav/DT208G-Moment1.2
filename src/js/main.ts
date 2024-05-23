    // Definiera typen för kursinformation
    interface CourseInfo  {
        code: string;
        name: string;
        progression: string;
        syllabus: string;
    }


    // Skapa en klass för att hantera kurser
    class CourseManager {

        // Variabel för att lagra kursinformation
        private courses: CourseInfo[];
        
        // Konstruktor för att skapa ett CourseManager-objekt
        constructor() {

            // Hämta lagrade kurser från localStorage om det finns, annars skapa en tom lista
            const storedCourses = localStorage.getItem('courses');
            if (storedCourses !==null) {
                this.courses = JSON.parse(storedCourses);
            } else {
                this.courses = [];
            }
            
            // Visa kurserna på sidan när den laddas
            this.renderCourses();
        }

    /*----------------FUNKTION FÖR ATT LÄGGA TILL KURS-------------------*/

        // Funktion för att lägga till en ny kurs
        addCourse(form: HTMLFormElement): void {

            // Skapa en ny kurs med informationen från formuläret
            const newCourse: CourseInfo = {
                code: form.code.value.trim().toUpperCase(),
                name: (form.querySelector('#name') as HTMLInputElement).value.trim(),     
                progression: form.progression.value.trim().toUpperCase(),           // Använt trim() och toUpperCase() för att standardisera värdet
                syllabus: form.syllabus.value.trim()
            };

            // Loggar värdet på newCourse.coe
    console.log("New Course Code:", newCourse.code);


            // Kontroll för att säkerställa att kurskod är unik
        if (this.courses.some(course => course.code === newCourse.code.trim().toUpperCase()))  {
            console.error("Kurskoden är inte unik.");
            alert("Kurskoden är inte unik. Var god välj annan kurskod.");
            return;
        }

    // Kontroll för progressionvärden
    const newProgression = form.progression.value.trim().toUpperCase();
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
        }

    /*----------------------FUNKTION FÖR ATT ÄNDRA KURS-----------------*/

        // Funktion för att uppdatera informationen för en befintlig kurs
        updateCourse(courseCode: string, newProgression: string): void {
            //Kontroll ifall progression stämmer
            if(['A', 'B', 'C'].indexOf(newProgression.trim().toUpperCase())=== -1){
                console.error("Fel progressionsvärde. A, B eller C gäller.");
                alert("Fel progressionsvärde. A, B eller C gäller.");
                return;
            }
            // Loopa igenom alla kurser för att hitta den som ska uppdateras
            for (let i = 0; i < this.courses.length; i++) {
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
        }

    /*--------------FUNKTION FÖR ATT TA BORT KURS-------------------------*/

    // Funktion för att ta bort en kurs
    removeCourse(courseCode: string): void {
        // Filtrera ut den kurs som ska tas bort och uppdatera kurslistan
        this.courses = this.courses.filter(course => course.code !== courseCode);

    
        this.saveCourses();

        this.renderCourses();
    }

    /*----------------FUNKTION FÖR ATT SPARA KURSER I LOCALSTORAGE--------*/

    // Funktion för att spara kurserna i localStorage
        private saveCourses(): void {
            localStorage.setItem('courses', JSON.stringify(this.courses));
        }

    /*--------------------------FUNKTION FÖR ATT VISA KURSER I DOM---------------------------*/

        // Funktion för att visa kurserna på sidan
        private renderCourses(): void {
            const coursesListElement = document.getElementById('coursesList');
            if (coursesListElement !== null) {
        
                // Rensa innehållet innan kurserna läggs till
                coursesListElement.innerHTML = '';

                // Loopa igenom alla kurser och skapa HTML-element för varje kurs samt knapp för radering av kurs
                this.courses.forEach(course => {
                    const courseElement = document.createElement('div');
                    courseElement.innerHTML = `
                        <h3>Kurskod: ${course.code}</h3>
                        <p>Kursnamn: ${course.name}</p>
                        <p>Progression: ${course.progression}</p>
                        <p>Syllabus: ${course.syllabus}</p>
                        <button class="remove-btn" data-code="${course.code}">Ta bort kurs</button> 
                    `;

            // Lägg till en händelselyssnare för att ta bort kursen när knappen klickas på
            const removeButton = courseElement.querySelector('.remove-btn') as HTMLButtonElement;
            if (removeButton !== null) {
                removeButton.addEventListener('click', () => {
                    const courseCode = removeButton.dataset.code;
                    if (courseCode) {
                        this.removeCourse(courseCode);
                    }
                });
            }
            
                    // Lägg till kursens HTML-element i DOM:en
                    coursesListElement.appendChild(courseElement);
                });
            }
        }
    }

    /*------------------HÄNDELSELYSSNARE PÅ FORMULÄR FÖR ATT LÄGGA TILL KURS-----------------------------------*/

    // Skapa ett CourseManager-objekt
    const courseManager = new CourseManager();

    // Hämta formuläret för att lägga till en ny kurs
    const addCourseForm = document.getElementById('addCourseForm') as HTMLFormElement;

    // Eventlyssnare på formuläret för att lägga till en ny kurs
    addCourseForm.addEventListener('submit', function(event) {
        event.preventDefault();                                             // Förhindra att sidan laddas om när formuläret skickas in
        courseManager.addCourse(addCourseForm);                             // Anropa funktionen för att lägga till kursen
        addCourseForm.reset();                                              // Rensa formuläret efter att kursen har lagts till
    });

    /*-------------------HÄNDELSELYSSNARE PÅ FORMULÄR FÖR ATT ÄNDRA KURS------------------------------------*/

    // Hämta formuläret för att ändra en befintlig kurs
    const updateCourseForm = document.getElementById('updateCourseForm') as HTMLFormElement;

    // Eventlyssnare på formuläret för att ändra en befintlig kurs
    updateCourseForm.addEventListener('submit', function(event) {
        event.preventDefault();                                             // Förhindra att sidan laddas om när formuläret skickas in
        
        // Hämta kurskoden och den nya progressionen från formuläret
        const courseCodeInput = updateCourseForm.courseCode as HTMLInputElement;
        const newProgressionInput = updateCourseForm.newProgression as HTMLInputElement;
        const courseCode = courseCodeInput.value;
        const newProgression = newProgressionInput.value;

        // Anropa funktionen för att uppdatera kursen med den nya progressionen
        courseManager.updateCourse(courseCode, newProgression);
        
        // Rensa formuläret efter att kursen har uppdaterats
        updateCourseForm.reset();
    });

