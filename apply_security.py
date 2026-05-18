import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Add Firebase Auth JS
text = text.replace(
    '<script src="https://www.gstatic.com/firebasejs/10.14.0/firebase-database-compat.js"></script>',
    '<script src="https://www.gstatic.com/firebasejs/10.14.0/firebase-database-compat.js"></script>\n    <script src="https://www.gstatic.com/firebasejs/10.14.0/firebase-auth-compat.js"></script>'
)

# 2. Replace HTML Modals Setup and Login
# We'll use regex to remove everything from '<!-- ===== SETUP PRIMERA VEZ ===== -->' to '<!-- ===== ADMIN TOGGLE ===== -->'
pattern_html = re.compile(
    r'(<!-- ===== SETUP PRIMERA VEZ ===== -->).*?(?=<!-- ===== ADMIN TOGGLE ===== -->)',
    re.DOTALL
)

new_login_html = """<!-- ===== LOGIN (FIREBASE) ===== -->
    <div class="ov-full blur" id="loginOv">
        <button onclick="document.getElementById('loginOv').classList.remove('on')" style="position:fixed;top:18px;right:18px;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.15);border:2px solid rgba(255,255,255,0.3);color:#fff;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:10001;backdrop-filter:blur(6px);transition:all .3s;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'" title="Cerrar">✕</button>

        <div class="box" id="loginBox">
            <div class="ico">🔐</div>
            <h2>Acceso Administrador</h2>
            <p class="sub">Inicia sesión con tu cuenta oficial</p>
            <input type="email" class="inp" id="lpEmail" placeholder="Correo electrónico" autocomplete="email">
            <input type="password" class="inp" id="lpPass" placeholder="Contraseña" autocomplete="current-password">
            <button class="btnx" onclick="SEC.login()" id="btnLg">ENTRAR AL PANEL</button>
            <div class="err" id="le"></div>
        </div>
    </div>

    """

text = pattern_html.sub(new_login_html, text)

# 3. Replace JS SEC Object
pattern_js = re.compile(
    r'(/\* ===== SEGURIDAD \(SEC\) ===== \*/).*?(?=/\* ===== MÓDULO ADMINISTRATIVO \(ADM\) ===== \*/)',
    re.DOTALL
)

new_sec_js = """/* ===== SEGURIDAD (SEC) ===== */
const SEC = {
    ok: false,
    
    init() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('Sesión iniciada:', user.email);
                this.ok = true;
                $('#admTog').classList.add('vis');
            } else {
                console.log('Sesión terminada');
                this.ok = false;
                $('#admTog').classList.remove('vis');
                $('#admOv').classList.remove('on');
            }
        });
    },

    _openSetup() {
        // Ahora usamos este método (con atajo Ctrl+Shift+Alt+F9) simplemente para mostrar el modal de Login.
        $('#loginOv').classList.add('on');
        $('#le').style.display = 'none';
        $('#lpEmail').value = '';
        $('#lpPass').value = '';
    },

    login() {
        const email = $('#lpEmail').value.trim();
        const pass = $('#lpPass').value.trim();
        const le = $('#le');
        const btn = $('#btnLg');
        
        if (!email || !pass) {
            le.textContent = '⚠️ Ingresa correo y contraseña';
            le.style.display = 'block';
            return;
        }

        le.style.display = 'none';
        btn.textContent = 'Verificando...';
        btn.disabled = true;

        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then((userCredential) => {
                // Éxito
                btn.textContent = 'ENTRAR AL PANEL';
                btn.disabled = false;
                $('#loginOv').classList.remove('on');
                $('#admOv').classList.add('on'); // Abre el panel automáticamente
            })
            .catch((error) => {
                btn.textContent = 'ENTRAR AL PANEL';
                btn.disabled = false;
                le.textContent = '⚠️ Credenciales incorrectas o problema de red.';
                le.style.display = 'block';
            });
    },

    logout() {
        firebase.auth().signOut().then(() => {
            location.reload();
        });
    }
};

"""
text = pattern_js.sub(new_sec_js, text)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Vulnerabilities fixed successfully in index.html")
