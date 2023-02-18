const navBar = document.querySelector(".navbar").children
const addButton = document.querySelector(".header-bar-add")
const addMenu = document.querySelector(".header-bar-add-menu")
const addMenuConfirmButton = document.querySelector(".add-menu-confirm > button")
const courses = document.querySelector(".courses")
const courseMenus = Array.from(document.querySelectorAll(".course-menu"))
 

addMenuConfirmButton.addEventListener('click', () => {
    const name = document.querySelector('.add-menu-name > input')
    const color = document.querySelector('.add-menu-color > input')
    createCourse(name.value, color.value)
    if(addMenu.classList.contains('fade-in')) {
        addMenu.classList.remove('fade-in')
        addMenu.classList.add('fade-out')
    }
})

// Open/close add menu
addButton.addEventListener('click', () => {
    if(addMenu.classList.contains('fade-in')) {
        addMenu.classList.remove('fade-in')
        addMenu.classList.add('fade-out')
    } else if(addMenu.classList.contains('fade-out')) {
        addMenu.classList.remove('fade-out')
        addMenu.classList.add('fade-in')
    } else {
        addMenu.classList.add('fade-in')
    }
})

// Close add menu when clicked out of
document.addEventListener('click', e => {
    if(addMenu.classList.contains('fade-in') && !addMenu.contains(e.target) && !addButton.contains(e.target)) {
        addMenu.classList.remove('fade-in')
        addMenu.classList.add('fade-out')
    }
})

// Create new course given name and color
function createCourse(name, color) {
    const courseBox = courses.appendChild(document.createElement('div'))
    courseBox.className = "course-layout"
    
    const courseColor = courseBox.appendChild(document.createElement('div')) 
    courseColor.className = "course-layout-pic"
    courseColor.style.backgroundColor = color;

    const menuButton =courseColor.appendChild(document.createElement('input'))
    menuButton.setAttribute('type', 'image')
    menuButton.className = 'course-menu'
    menuButton.setAttribute('src', 'svg/navbar/3-vertical-dots-icon.svg')
    menuButton.addEventListener('click', deleteCourse)
    courseMenus.push(menuButton)

    const courseName = courseBox.appendChild(document.createElement('div'))
    courseName.className = "course-layout-content"
    courseName.append(name)
}

// Deletes course upon clicking the menu button
function deleteCourse() {
    // Gets course div of menu item and deletes it
    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)
}

// Course template for reference
{/* <div class="course-layout">
    <div class="course-layout-pic">
        <input type="image" class="course-menu" src="svg/3-vertical-dots-icon.svg">
    </div>
    <div class="course-layout-content">
        Software Engineering
    </div>
</div>  */}