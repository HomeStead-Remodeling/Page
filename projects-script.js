document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(event.target) && 
            !mobileMenuToggle.contains(event.target)) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectsGallery = document.getElementById('projectsGallery');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    // Sample projects data
    const projects = [
        { id: 1, category: 'residential', title: 'Modern Villa', description: 'Luxury residential villa with panoramic views', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80' },
        { id: 2, category: 'commercial', title: 'Office Complex', description: '10-story commercial building', image: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=800&q=80' },
        { id: 3, category: 'industrial', title: 'Factory Facility', description: 'Manufacturing plant construction', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80' },
        { id: 4, category: 'residential', title: 'Apartment Building', description: 'Multi-unit residential complex', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
        { id: 5, category: 'commercial', title: 'Shopping Mall', description: 'Retail and entertainment center', image: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=800&q=80' },
        { id: 6, category: 'renovation', title: 'Historic Renovation', description: 'Restoration of heritage building', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80' },
        { id: 7, category: 'residential', title: 'Townhouse Development', description: 'Series of luxury townhouses', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
        { id: 8, category: 'industrial', title: 'Warehouse Complex', description: 'Logistics and storage facility', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80' }
    ];
    
    let visibleProjects = 6;
    
    // Initialize gallery
    function renderProjects(filter = 'all') {
        const filteredProjects = filter === 'all' 
            ? projects.slice(0, visibleProjects)
            : projects.filter(p => p.category === filter).slice(0, visibleProjects);
        
        projectsGallery.innerHTML = '';
        
        filteredProjects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project-card';
            projectElement.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                </div>
            `;
            projectsGallery.appendChild(projectElement);
        });
        
        // Show/hide load more button
        if (loadMoreBtn) {
            const totalFiltered = filter === 'all' 
                ? projects.length 
                : projects.filter(p => p.category === filter).length;
            
            loadMoreBtn.style.display = visibleProjects >= totalFiltered ? 'none' : 'block';
        }
    }
    
    // Filter button click events
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Reset visible projects count
                visibleProjects = 6;
                
                // Filter and render projects
                const filter = this.getAttribute('data-filter');
                renderProjects(filter);
            });
        });
    }
    
    // Load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            visibleProjects += 3;
            const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            renderProjects(activeFilter);
        });
    }
    
    // Initial render
    if (projectsGallery) {
        renderProjects();
    }
    
    // Logo setup
    const headerLogo = document.getElementById('headerLogo');
    const footerLogo = document.getElementById('footerLogo');
    
    if (headerLogo) {
        headerLogo.src = "https://i.ibb.co/GQs3zPrz/image-removebg-preview.png";
    }
    
    if (footerLogo) {
        footerLogo.src = "https://i.ibb.co/GQs3zPrz/image-removebg-preview.png";
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#') && 
                this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
