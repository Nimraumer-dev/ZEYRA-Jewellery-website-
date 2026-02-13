# Script to add auth modal and search overlay to all HTML pages

$authSearchHTML = @'

    <!-- Login/Signup Modal -->
    <div id="authModal" class="auth-modal">
        <div class="auth-modal-content">
            <span class="auth-close">&times;</span>
            
            <!-- Login Form -->
            <div id="loginForm" class="auth-form active">
                <h2>Welcome Back</h2>
                <p class="auth-subtitle">Login to your account</p>
                
                <form onsubmit="handleLogin(event)">
                    <div class="form-group">
                        <label for="loginEmail">Email Address</label>
                        <input type="email" id="loginEmail" required placeholder="Enter your email">
                    </div>
                    
                    <div class="form-group">
                        <label for="loginPassword">Password</label>
                        <input type="password" id="loginPassword" required placeholder="Enter your password">
                    </div>
                    
                    <div class="form-options">
                        <label class="remember-me">
                            <input type="checkbox" id="rememberMe">
                            <span>Remember me</span>
                        </label>
                        <a href="#" class="forgot-password">Forgot Password?</a>
                    </div>
                    
                    <button type="submit" class="auth-btn">Login</button>
                    
                    <div class="auth-divider">
                        <span>OR</span>
                    </div>
                    
                    <div class="social-login">
                        <button type="button" class="social-btn google-btn">
                            <i class="fab fa-google"></i> Continue with Google
                        </button>
                        <button type="button" class="social-btn facebook-btn">
                            <i class="fab fa-facebook-f"></i> Continue with Facebook
                        </button>
                    </div>
                    
                    <p class="auth-switch">
                        Don't have an account? <a href="#" onclick="switchToSignup(event)">Sign Up</a>
                    </p>
                </form>
            </div>
            
            <!-- Signup Form -->
            <div id="signupForm" class="auth-form">
                <h2>Create Account</h2>
                <p class="auth-subtitle">Join us today</p>
                
                <form onsubmit="handleSignup(event)">
                    <div class="form-group">
                        <label for="signupName">Full Name</label>
                        <input type="text" id="signupName" required placeholder="Enter your full name">
                    </div>
                    
                    <div class="form-group">
                        <label for="signupEmail">Email Address</label>
                        <input type="email" id="signupEmail" required placeholder="Enter your email">
                    </div>
                    
                    <div class="form-group">
                        <label for="signupPassword">Password</label>
                        <input type="password" id="signupPassword" required placeholder="Create a password">
                    </div>
                    
                    <div class="form-group">
                        <label for="signupConfirmPassword">Confirm Password</label>
                        <input type="password" id="signupConfirmPassword" required placeholder="Confirm your password">
                    </div>
                    
                    <div class="form-options">
                        <label class="remember-me">
                            <input type="checkbox" id="agreeTerms" required>
                            <span>I agree to the <a href="#">Terms & Conditions</a></span>
                        </label>
                    </div>
                    
                    <button type="submit" class="auth-btn">Create Account</button>
                    
                    <div class="auth-divider">
                        <span>OR</span>
                    </div>
                    
                    <div class="social-login">
                        <button type="button" class="social-btn google-btn">
                            <i class="fab fa-google"></i> Sign up with Google
                        </button>
                        <button type="button" class="social-btn facebook-btn">
                            <i class="fab fa-facebook-f"></i> Sign up with Facebook
                        </button>
                    </div>
                    
                    <p class="auth-switch">
                        Already have an account? <a href="#" onclick="switchToLogin(event)">Login</a>
                    </p>
                </form>
            </div>
        </div>
    </div>

    <!-- Search Overlay -->
    <div id="searchOverlay" class="search-overlay">
        <div class="search-container">
            <span class="search-close">&times;</span>
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="searchInput" placeholder="Search for products...">
            </div>
            <div id="searchResults" class="search-results">
                <p class="search-hint">Start typing to search products...</p>
            </div>
        </div>
    </div>
'@

# List of HTML files to update (excluding index.html which is already done, and auth.html)
$files = @(
    "new-arrival.html",
    "about.html",
    "contact.html",
    "shop.html",
    "all-products.html",
    "bangles.html",
    "nose-rings.html",
    "bracelet.html",
    "necklace.html",
    "earrings.html",
    "bridal-sets.html",
    "pendant.html",
    "finger-rings.html",
    "blog-festive-jewellery.html",
    "blog-marriage-jewellery.html",
    "blog-trends-2025.html"
)

foreach ($file in $files) {
    $filePath = Join-Path $PSScriptRoot $file
    
    if (Test-Path $filePath) {
        Write-Host "Processing $file..." -ForegroundColor Green
        
        # Read the file content
        $content = Get-Content $filePath -Raw
        
        # Check if auth modal already exists
        if ($content -match 'id="authModal"') {
            Write-Host "  Auth modal already exists in $file, skipping..." -ForegroundColor Yellow
            continue
        }
        
        # Find the position to insert (before the script tags, after cartOverlay)
        if ($content -match '(\s*<div id="cartOverlay"[^>]*></div>\s*)(\r?\n\s*<script)') {
            $newContent = $content -replace '(\s*<div id="cartOverlay"[^>]*></div>\s*)(\r?\n\s*<script)', "`$1$authSearchHTML`$2"
            
            # Write the updated content back to the file
            Set-Content -Path $filePath -Value $newContent -NoNewline
            Write-Host "  Successfully updated $file" -ForegroundColor Cyan
        } else {
            Write-Host "  Could not find insertion point in $file" -ForegroundColor Red
        }
    } else {
        Write-Host "File not found: $file" -ForegroundColor Red
    }
}

Write-Host "`nAll files processed!" -ForegroundColor Green
