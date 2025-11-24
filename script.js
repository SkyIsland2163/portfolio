// 모바일 메뉴 토글
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// 네비게이션 링크 클릭 시 메뉴 닫기
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// 스크롤 시 네비게이션 스타일 변경
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// 프로젝트 데이터 로드 및 렌더링
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const projects = await response.json();
        const projectsGrid = document.getElementById('projectsGrid');
        
        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card">
                <div class="project-image">
                    <div class="project-placeholder">
                        <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                            <rect width="300" height="200" fill="#f0f7fa"/>
                            <circle cx="150" cy="100" r="50" fill="#b8dce8"/>
                            <rect x="100" y="80" width="100" height="40" fill="#a8d5e2" rx="5"/>
                        </svg>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">자세히 보기</a>
                </div>
            </div>
        `).join('');
        
        // 프로젝트 카드에 애니메이션 적용
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
            observer.observe(card);
        });
    } catch (error) {
        console.error('프로젝트를 불러오는 중 오류가 발생했습니다:', error);
        document.getElementById('projectsGrid').innerHTML = '<p>프로젝트를 불러올 수 없습니다.</p>';
    }
}

// 페이지 로드 시 프로젝트 로드
loadProjects();

// Contact 폼 제출 처리
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 폼 데이터 가져오기
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // 간단한 유효성 검사
    if (!formData.name || !formData.email || !formData.message) {
        alert('모든 필드를 입력해주세요.');
        return;
    }
    
    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('올바른 이메일 주소를 입력해주세요.');
        return;
    }
    
    // mailto 링크로 이메일 발송
    const subject = encodeURIComponent(`포트폴리오 문의: ${formData.name}`);
    const body = encodeURIComponent(`이름: ${formData.name}\n이메일: ${formData.email}\n\n메시지:\n${formData.message}`);
    const mailtoLink = `mailto:dlkdm0703@bible.ac.kr?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
    
    // 폼 초기화
    contactForm.reset();
});

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 프로젝트 카드 애니메이션은 loadProjects 함수 내에서 처리됩니다

// Contact 섹션 애니메이션
const contactSection = document.querySelector('.contact-wrapper');
if (contactSection) {
    contactSection.style.opacity = '0';
    contactSection.style.transform = 'translateY(30px)';
    contactSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    contactObserver.observe(contactSection);
}

// 부드러운 스크롤 (네비게이션 링크 클릭 시)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

