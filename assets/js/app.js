// Initialize functions when DOM is loaded
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');
const menu = document.querySelectorAll('.navbar-menu');
const burger = document.querySelectorAll('.navbar-burger');
const close = document.querySelectorAll('.navbar-close');
const backdrop = document.querySelectorAll('.navbar-backdrop');
const mobileMenuLinks = document.querySelectorAll('#mobile-menu a[href^="#"]');

document.addEventListener('DOMContentLoaded', () => {
   
    // setDefaultActiveLink();
    handleScroll();// পেজ লোড হলে active link ঠিক করে
    window.addEventListener('scroll', handleScroll);// স্ক্রল করলে active link আপডেট করে

    if (burger.length && menu.length) {
        handleMobileMenuToggle(burger, menu);// মোবাইল মেনু টগল ফাংশন চালু করে
    }

    if (close.length && backdrop.length && menu.length) {
        handleMobileMenuClose(close, backdrop, menu); // মোবাইল মেনু বন্ধ করার ফাংশন চালু করে
    }

    if (mobileMenuLinks.length && navLinks.length && menu.length) {
        handleMobileMenuLinkClick(mobileMenuLinks, navLinks, menu);// মোবাইল মেনুতে লিংকে ক্লিক করলে active সেট করে ও মেনু বন্ধ করে
    }
});


function setActiveLink(sections, navLinks) {
    let index = sections.length;

    console.log(index)

    while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

    navLinks.forEach((link) => link.classList.remove('active'));// সব link থেকে active ক্লাস সরায়
    if (navLinks[index]) {
        navLinks[index].classList.add('active');// যেটা এখন স্ক্রিনে দেখা যাচ্ছে, সেটায় active ক্লাস যোগ করে
    }
}

function setDefaultActiveLink() { //‍যদি ইউজার কোনো section-এ না যায় (যেমন: পেজ লোড হওয়ার পর), তাহলে ‍Home link-কে ‍default হিসেবে ‍.active করে দেয়
    const homeLink = document.querySelector('nav a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
}

function handleScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    setActiveLink(sections, navLinks);// scroll করার সময় active link আপডেট করে
}

function handleMobileMenuToggle(burger, menu) {
    burger.forEach(b => {
        b.addEventListener('click', () => {
            menu.forEach(m => m.classList.toggle('hidden'));// show/hide করে .hidden ক্লাস থাকলে মেনু লুকায়, না থাকলে দেখায়।
        });
    });
}

function handleMobileMenuClose(close, backdrop, menu) {
    close.forEach(c => {
        c.addEventListener('click', () => {
            menu.forEach(m => m.classList.add('hidden'));// মেনু লুকিয়ে ফেলে
        });
    });

    backdrop.forEach(b => {
        b.addEventListener('click', () => {
            menu.forEach(m => m.classList.add('hidden'));// ব্যাকড্রপে ক্লিক করলে মেনু বন্ধ হয়
        });
    });
}

function handleMobileMenuLinkClick(mobileMenuLinks, navLinks, menu) {
    mobileMenuLinks.forEach(anchor => {
        anchor.addEventListener('click', function() {
            navLinks.forEach((link) => link.classList.remove('active'));// সব link থেকে active সরায়
            const targetLink = document.querySelector(`nav a[href="${this.getAttribute('href')}"]`);
            if (targetLink) {
                targetLink.classList.add('active');// যেটাতে ক্লিক হয়েছে, সেটাতে active দেয়
            }
            menu.forEach(m => m.classList.add('hidden'));// মেনু বন্ধ করে
        });
    });
}


