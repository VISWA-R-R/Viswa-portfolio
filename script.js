// =========================================
// PORTFOLIO JAVASCRIPT
// VISWA R R
// =========================================

"use strict";


// =========================================
// DOM READY
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Viswa R R Portfolio Loaded");

});


// =========================================
// PRELOADER
// =========================================

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    if (!preloader) return;

    setTimeout(() => {

        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";

        setTimeout(() => {

            preloader.remove();

        }, 500);

    }, 700);

});


// =========================================
// NAVBAR SCROLL EFFECT
// =========================================

const header = document.querySelector(".header");

function handleNavbarScroll() {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

// (listener registered below, combined with
// updateActiveNavigation into one rAF-throttled
// scroll handler to avoid layout thrashing)


// =========================================
// MOBILE MENU
// =========================================

const menuButton =
    document.querySelector(".menu-btn");

const navbar =
    document.querySelector(".navbar");

const navigationLinks =
    document.querySelectorAll(".nav-links a");


// Open / Close Mobile Menu

if (menuButton && navbar) {

    menuButton.addEventListener("click", () => {

        navbar.classList.toggle("active");

        const icon =
            menuButton.querySelector("i");

        if (!icon) return;

        if (navbar.classList.contains("active")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

}


// =========================================
// CLOSE MOBILE MENU AFTER CLICK
// =========================================

navigationLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (!navbar || !menuButton) return;

        navbar.classList.remove("active");

        const icon =
            menuButton.querySelector("i");

        if (!icon) return;

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});


// =========================================
// ACTIVE NAVIGATION LINK
// =========================================

const pageSections =
    document.querySelectorAll("section[id]");


function updateActiveNavigation() {

    let currentSection = "";

    pageSections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href");

        if (
            target === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


// =========================================
// THROTTLE SCROLL WORK WITH requestAnimationFrame
// Runs the navbar + active-link updates at most
// once per animation frame instead of once per
// scroll event, which cuts out redundant layout
// reads while scrolling and keeps things smooth.
// =========================================

let scrollTicking = false;

function onScroll() {

    if (scrollTicking) return;

    scrollTicking = true;

    requestAnimationFrame(() => {

        handleNavbarScroll();
        updateActiveNavigation();

        scrollTicking = false;

    });

}

window.addEventListener(
    "scroll",
    onScroll,
    { passive: true }
);


// =========================================
// CLOSE MENU WHEN CLICKING OUTSIDE
// =========================================

document.addEventListener("click", event => {

    if (!navbar || !menuButton) return;

    const clickedInsideNavbar =
        navbar.contains(event.target);

    const clickedMenuButton =
        menuButton.contains(event.target);

    if (
        !clickedInsideNavbar &&
        !clickedMenuButton &&
        navbar.classList.contains("active")
    ) {

        navbar.classList.remove("active");

        const icon =
            menuButton.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    }

});


// =========================================
// PREVENT EMPTY HASH LINKS
// =========================================

document.querySelectorAll('a[href="#"]').forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

    });

});
// =========================================
// TYPING ANIMATION
// =========================================

const typingElement =
    document.querySelector(".typing");


// =========================================
// TEXT TO TYPE
// =========================================

const typingTexts = [

    "Java Developer",

    "Backend Developer",

    "Full Stack Developer",

    "Spring Boot Developer",

    "Software Engineer"

];


// =========================================
// TYPING SETTINGS
// =========================================

let textIndex = 0;

let characterIndex = 0;

let isDeleting = false;

const typingSpeed = 90;

const deletingSpeed = 50;

const pauseAfterTyping = 1800;

const pauseAfterDeleting = 500;


// =========================================
// TYPING FUNCTION
// =========================================

function typeText() {

    if (!typingElement) return;


    const currentText =
        typingTexts[textIndex];


    // -----------------------------
    // TYPING
    // -----------------------------

    if (!isDeleting) {

        typingElement.textContent =
            currentText.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        // Finished typing

        if (
            characterIndex ===
            currentText.length
        ) {

            isDeleting = true;

            setTimeout(
                typeText,
                pauseAfterTyping
            );

            return;

        }


        setTimeout(
            typeText,
            typingSpeed
        );

        return;

    }


    // -----------------------------
    // DELETING
    // -----------------------------

    typingElement.textContent =
        currentText.substring(
            0,
            characterIndex - 1
        );

    characterIndex--;


    // Finished deleting

    if (characterIndex === 0) {

        isDeleting = false;

        textIndex++;

        if (
            textIndex >=
            typingTexts.length
        ) {

            textIndex = 0;

        }

        setTimeout(
            typeText,
            pauseAfterDeleting
        );

        return;

    }


    setTimeout(
        typeText,
        deletingSpeed
    );

}


// =========================================
// START TYPING
// =========================================

if (typingElement) {

    setTimeout(
        typeText,
        500
    );

}
// =========================================
// DARK / LIGHT THEME
// =========================================

const themeToggle =
    document.querySelector(".theme-toggle");

const themeIcon =
    themeToggle
        ? themeToggle.querySelector("i")
        : null;


// =========================================
// APPLY SAVED THEME
// =========================================

const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "light") {

    document.body.classList.add("light-theme");

}


// =========================================
// UPDATE THEME ICON
// =========================================

function updateThemeIcon() {

    if (!themeIcon) return;


    if (
        document.body.classList.contains(
            "light-theme"
        )
    ) {

        // Light mode → show sun

        themeIcon.classList.remove(
            "fa-moon"
        );

        themeIcon.classList.add(
            "fa-sun"
        );

    } else {

        // Dark mode → show moon

        themeIcon.classList.remove(
            "fa-sun"
        );

        themeIcon.classList.add(
            "fa-moon"
        );

    }

}


// Set correct icon when page loads

updateThemeIcon();


// =========================================
// THEME TOGGLE CLICK
// =========================================

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-theme"
            );


            const isLight =
                document.body.classList.contains(
                    "light-theme"
                );


            // Save preference

            localStorage.setItem(
                "portfolio-theme",
                isLight
                    ? "light"
                    : "dark"
            );


            // Change icon

            updateThemeIcon();

        }
    );

}
// =========================================
// SCROLL ANIMATION - AOS
// =========================================

// Check whether AOS is available

if (typeof AOS !== "undefined") {

    AOS.init({

        duration: 900,

        easing: "ease-out-cubic",

        once: true,

        offset: 100,

        delay: 50,

        mirror: false

    });

}


// =========================================
// REFRESH AOS ON WINDOW RESIZE
// =========================================

window.addEventListener("resize", () => {

    if (typeof AOS !== "undefined") {

        AOS.refresh();

    }

});


// =========================================
// CUSTOM SECTION REVEAL
// =========================================

const revealElements =
    document.querySelectorAll(
        ".skill-category, " +
        ".project-card, " +
        ".repository-card, " +
        ".timeline-item, " +
        ".certificate-card, " +
        ".contact-card, " +
        ".edu-card"
    );


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (
                    !entry.isIntersecting
                ) {
                    return;
                }


                entry.target.classList.add(
                    "reveal-visible"
                );


                observer.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -50px 0px"
        }
    );


revealElements.forEach(element => {

    element.classList.add(
        "reveal-element"
    );

    revealObserver.observe(element);

});


// =========================================
// STAGGER CARD ANIMATIONS
// =========================================

const cardGroups = [

    ".skill-grid .skill-card",

    ".projects-container .project-card",

    ".repository-container .repository-card",

    ".certificate-container .certificate-card",

    ".education-highlights .edu-card"

];


cardGroups.forEach(selector => {

    const cards =
        document.querySelectorAll(selector);


    cards.forEach((card, index) => {

        card.style.setProperty(
            "--animation-delay",
            `${index * 100}ms`
        );

    });

});
// =========================================
// SKILL PROGRESS BAR ANIMATION
// =========================================

const skillProgressBars =
    document.querySelectorAll(
        ".progress span"
    );


// =========================================
// SKILL OBSERVER
// =========================================

const skillObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const progressBar =
                    entry.target;

                // Read the width already
                // defined in HTML

                const targetWidth =
                    progressBar.style.width;

                // Reset first

                progressBar.style.width =
                    "0%";

                // Animate after a small delay

                setTimeout(() => {

                    progressBar.style.width =
                        targetWidth;

                }, 150);

                // Animate only once

                observer.unobserve(
                    progressBar
                );

            });

        },
        {
            threshold: 0.5
        }
    );


// =========================================
// OBSERVE ALL SKILL BARS
// =========================================

skillProgressBars.forEach(bar => {

    skillObserver.observe(bar);

});
// =========================================
// GITHUB API INTEGRATION
// =========================================

const githubUsername = "VISWA-R-R";

const githubAPI =
    `https://api.github.com/users/${githubUsername}`;


// =========================================
// GITHUB ELEMENTS
// =========================================

const githubAvatar =
    document.getElementById("githubAvatar");

const githubName =
    document.getElementById("githubName");

const githubBio =
    document.getElementById("githubBio");

const repoCount =
    document.getElementById("repoCount");

const followers =
    document.getElementById("followers");

const following =
    document.getElementById("following");

const stars =
    document.getElementById("stars");

const repositoryContainer =
    document.getElementById(
        "repositoryContainer"
    );


// =========================================
// FETCH GITHUB PROFILE
// =========================================

async function loadGitHubProfile() {

    if (!githubAPI) return;

    try {

        const response =
            await fetch(githubAPI);

        if (!response.ok) {

            throw new Error(
                `GitHub API Error: ${response.status}`
            );

        }

        const user =
            await response.json();


        // Profile image

        if (githubAvatar) {

            githubAvatar.src =
                user.avatar_url;

            githubAvatar.alt =
                `${user.login} GitHub Profile`;

        }


        // Name

        if (githubName) {

            githubName.textContent =
                user.name ||
                user.login;

        }


        // Bio

        if (githubBio) {

            githubBio.textContent =
                user.bio ||
                "Java Developer | Full Stack Developer";

        }


        // Statistics

        if (repoCount) {

            repoCount.textContent =
                user.public_repos;

        }

        if (followers) {

            followers.textContent =
                user.followers;

        }

        if (following) {

            following.textContent =
                user.following;

        }


        // Fetch repositories

        await loadGitHubRepositories();

    }

    catch (error) {

        console.error(
            "GitHub profile error:",
            error
        );

        showGitHubError();

    }

}


// =========================================
// FETCH GITHUB REPOSITORIES
// =========================================

async function loadGitHubRepositories() {

    if (!repositoryContainer) return;


    repositoryContainer.innerHTML = `

        <div class="github-loading">

            <i class="fas fa-spinner"></i>

            <p>Loading GitHub repositories...</p>

        </div>

    `;


    try {

        const response =
            await fetch(
                `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=8`
            );


        if (!response.ok) {

            throw new Error(
                `Repository API Error: ${response.status}`
            );

        }


        const repositories =
            await response.json();


        // Clear loading

        repositoryContainer.innerHTML = "";


        if (
            !repositories ||
            repositories.length === 0
        ) {

            repositoryContainer.innerHTML = `

                <div class="github-error">

                    <i class="fab fa-github"></i>

                    <p>
                        No public repositories found.
                    </p>

                </div>

            `;

            return;

        }


        // Calculate total stars

        const totalStars =
            repositories.reduce(
                (total, repo) =>
                    total +
                    repo.stargazers_count,
                0
            );


        if (stars) {

            stars.textContent =
                totalStars;

        }


        // Create repository cards

        repositories.forEach(
            repository => {

                const card =
                    createRepositoryCard(
                        repository
                    );

                repositoryContainer.appendChild(
                    card
                );

            }
        );


        // Observe dynamically
        // created cards

        observeDynamicRepositories();

    }

    catch (error) {

        console.error(
            "GitHub repository error:",
            error
        );

        showGitHubError();

    }

}


// =========================================
// CREATE REPOSITORY CARD
// =========================================

function createRepositoryCard(
    repository
) {

    const card =
        document.createElement("article");


    card.className =
        "repository-card";


    const description =
        repository.description ||
        "No description available.";


    const language =
        repository.language ||
        "Not specified";


    const updatedDate =
        formatGitHubDate(
            repository.updated_at
        );


    card.innerHTML = `

        <div class="repository-header">

            <h3>
                ${escapeHTML(
                    repository.name
                )}
            </h3>

            <i class="fab fa-github"></i>

        </div>


        <p>
            ${escapeHTML(
                description
            )}
        </p>


        <div class="repository-info">

            <span>
                <i class="fas fa-star"></i>
                ${repository.stargazers_count}
                Stars
            </span>

            <span>
                <i class="fas fa-code-branch"></i>
                ${repository.forks_count}
                Forks
            </span>

            <span>
                <i class="fas fa-clock"></i>
                Updated ${updatedDate}
            </span>

        </div>


        <div class="repository-info">

            <span class="language-badge">

                <span class="language-dot"></span>

                ${escapeHTML(
                    language
                )}

            </span>

        </div>


        <a
            href="${repository.html_url}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn primary"
        >

            <i class="fab fa-github"></i>

            View Repository

        </a>

    `;


    return card;

}


// =========================================
// ESCAPE HTML
// =========================================

function escapeHTML(value) {

    const element =
        document.createElement("div");

    element.textContent =
        value ?? "";

    return element.innerHTML;

}


// =========================================
// FORMAT GITHUB DATE
// =========================================

function formatGitHubDate(dateString) {

    if (!dateString) {

        return "recently";

    }


    const date =
        new Date(dateString);


    if (Number.isNaN(
        date.getTime()
    )) {

        return "recently";

    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


// =========================================
// GITHUB ERROR
// =========================================

function showGitHubError() {

    if (!repositoryContainer) return;


    repositoryContainer.innerHTML = `

        <div class="github-error">

            <i class="fab fa-github"></i>

            <p>
                Unable to load GitHub repositories
                right now.
            </p>

            <a
                href="https://github.com/VISWA-R-R"
                target="_blank"
                rel="noopener noreferrer"
                class="btn secondary"
            >

                Visit GitHub

            </a>

        </div>

    `;

}


// =========================================
// OBSERVE DYNAMIC REPOSITORIES
// =========================================

function observeDynamicRepositories() {

    const cards =
        document.querySelectorAll(
            ".repository-card"
        );


    if (
        !("IntersectionObserver"
            in window)
    ) {

        cards.forEach(card => {

            card.classList.add(
                "reveal-visible"
            );

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    entry.target.classList.add(
                        "reveal-visible"
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.1
            }
        );


    cards.forEach(card => {

        card.classList.add(
            "reveal-element"
        );

        observer.observe(card);

    });

}


// =========================================
// START GITHUB
// =========================================

loadGitHubProfile();
// =========================================
// ANIMATED STAT COUNTERS
// =========================================

const counters =
    document.querySelectorAll(
        ".highlight h2, .stat-card h2"
    );


// =========================================
// COUNTER FUNCTION
// =========================================

function animateCounter(
    element,
    target
) {

    if (!element) return;

    const duration = 1500;

    const startTime =
        performance.now();


    function updateCounter(
        currentTime
    ) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        // Smooth easing

        const easedProgress =
            1 - Math.pow(
                1 - progress,
                3
            );


        const currentValue =
            Math.floor(
                easedProgress * target
            );


        element.textContent =
            currentValue;


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            element.textContent =
                target;

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


// =========================================
// OBSERVE COUNTERS
// =========================================

if (
    "IntersectionObserver"
    in window
) {

    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    const element =
                        entry.target;


                    // Prevent counter
                    // from running twice

                    if (
                        element.dataset.animated ===
                        "true"
                    ) {

                        return;

                    }


                    const target =
                        parseInt(
                            element.textContent,
                            10
                        );


                    if (
                        Number.isNaN(target)
                    ) {

                        return;

                    }


                    element.dataset.animated =
                        "true";


                    element.textContent =
                        "0";


                    animateCounter(
                        element,
                        target
                    );


                    observer.unobserve(
                        element
                    );

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(
            counter
        );

    });

}


// =========================================
// SCROLL TO TOP
// =========================================

const scrollTopButton =
    document.getElementById(
        "scrollTop"
    );


// =========================================
// SHOW / HIDE BUTTON
// =========================================

function updateScrollTopButton() {

    if (!scrollTopButton) return;


    if (window.scrollY > 500) {

        scrollTopButton.classList.add(
            "show"
        );

    } else {

        scrollTopButton.classList.remove(
            "show"
        );

    }

}


window.addEventListener(
    "scroll",
    updateScrollTopButton,
    { passive: true }
);


// =========================================
// SCROLL TO TOP CLICK
// =========================================

if (scrollTopButton) {

    scrollTopButton.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}
// =========================================
// CONTACT FORM - REAL EMAIL DELIVERY
// =========================================

const contactForm =
    document.getElementById("contactForm");

let formStatus =
    document.querySelector(".form-status");

if (contactForm && !formStatus) {

    formStatus =
        document.createElement("div");

    formStatus.className =
        "form-status";

    formStatus.setAttribute(
        "role",
        "status"
    );

    formStatus.setAttribute(
        "aria-live",
        "polite"
    );

    contactForm.appendChild(
        formStatus
    );
}


// =========================================
// FORM SUBMISSION
// =========================================

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            const nameInput =
                contactForm.querySelector(
                    'input[name="name"]'
                );

            const emailInput =
                contactForm.querySelector(
                    'input[name="email"]'
                );

            const messageInput =
                contactForm.querySelector(
                    'textarea[name="message"]'
                );

            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );


            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";

            const email =
                emailInput
                    ? emailInput.value.trim()
                    : "";

            const message =
                messageInput
                    ? messageInput.value.trim()
                    : "";


            // =================================
            // VALIDATION
            // =================================

            if (!name) {

                showFormStatus(
                    "Please enter your name.",
                    "error"
                );

                nameInput?.focus();

                return;
            }


            if (!isValidEmail(email)) {

                showFormStatus(
                    "Please enter a valid email address.",
                    "error"
                );

                emailInput?.focus();

                return;
            }


            if (message.length < 10) {

                showFormStatus(
                    "Please enter a message with at least 10 characters.",
                    "error"
                );

                messageInput?.focus();

                return;
            }


            // =================================
            // LOADING
            // =================================

            const originalButtonHTML =
                submitButton
                    ? submitButton.innerHTML
                    : "";


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.innerHTML = `
                    <i class="fas fa-spinner fa-spin"></i>
                    Sending...
                `;
            }


            showFormStatus(
                "Sending your message...",
                "loading"
            );


            try {

                const formData =
                    new FormData(contactForm);


                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method: "POST",
                            body: formData,
                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                const result =
                    await response.json();


                if (!response.ok ||
                    !result.success) {

                    throw new Error(
                        result.message ||
                        "Unable to send the message."
                    );
                }


                showFormStatus(
                    "Message sent successfully!",
                    "success"
                );


                contactForm.reset();


            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                showFormStatus(
                    "Sorry, your message could not be sent. Please try again.",
                    "error"
                );


            } finally {

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.innerHTML =
                        originalButtonHTML;
                }
            }
        }
    );
}


// =========================================
// EMAIL VALIDATION
// =========================================

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}


// =========================================
// FORM STATUS
// =========================================

function showFormStatus(
    message,
    type
) {

    if (!formStatus) return;


    formStatus.textContent =
        message;

    formStatus.className =
        `form-status ${type}`;


    if (type === "success") {

        setTimeout(() => {

            formStatus.textContent = "";

            formStatus.className =
                "form-status";

        }, 6000);
    }
}
// =========================================
// LAZY LOAD IMAGES
// =========================================

const images =
    document.querySelectorAll(
        "img[data-src]"
    );


if (
    "IntersectionObserver"
    in window
) {

    const imageObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    const image =
                        entry.target;


                    const source =
                        image.dataset.src;


                    if (source) {

                        image.src =
                            source;

                    }


                    image.removeAttribute(
                        "data-src"
                    );


                    image.classList.add(
                        "loaded"
                    );


                    observer.unobserve(
                        image
                    );

                });

            },
            {
                rootMargin:
                    "200px 0px"
            }
        );


    images.forEach(image => {

        imageObserver.observe(
            image
        );

    });

}


// =========================================
// EXTERNAL LINKS
// =========================================

const externalLinks =
    document.querySelectorAll(
        'a[target="_blank"]'
    );


externalLinks.forEach(link => {

    if (
        !link.hasAttribute("rel")
    ) {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    }

});


// =========================================
// PROJECT IMAGE ERROR HANDLING
// =========================================

const allImages =
    document.querySelectorAll(
        "img"
    );


allImages.forEach(image => {

    image.addEventListener(
        "error",
        () => {

            image.classList.add(
                "image-error"
            );

        }
    );

});


// =========================================
// RIPPLE EFFECT FOR BUTTONS
// =========================================

const buttons =
    document.querySelectorAll(
        ".btn"
    );


buttons.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            const ripple =
                document.createElement(
                    "span"
                );


            ripple.className =
                "button-ripple";


            const rect =
                button.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            ripple.style.left =
                `${x}px`;

            ripple.style.top =
                `${y}px`;


            button.appendChild(
                ripple
            );


            setTimeout(() => {

                ripple.remove();

            }, 600);

        }
    );

});


// =========================================
// CURSOR GLOW
// (removed: this ran an infinite
// requestAnimationFrame loop plus a
// document-wide mousemove listener for a
// div with no matching CSS styling, so it
// was invisible and just burned CPU/battery
// on every frame for the whole session.)
// =========================================


// =========================================
// CONSOLE MESSAGE
// =========================================

console.log(
    "%c Viswa R R | Portfolio ",
    "color:#00d4ff;font-size:20px;font-weight:bold;"
);

console.log(
    "%c Java Developer • Full Stack Developer • Software Engineer ",
    "color:#7c3aed;font-size:13px;"
);


// =========================================
// PERFORMANCE OPTIMIZATION
// =========================================

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            document.body.classList.add(
                "page-hidden"
            );

        } else {

            document.body.classList.remove(
                "page-hidden"
            );

        }

    }
);