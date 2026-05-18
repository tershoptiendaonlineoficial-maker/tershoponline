import re

def modify_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()

    # 1. Update saveCfg
    text = text.replace("c.yt = $('#cYT').value.trim();", 
                        "c.yt = $('#cYT').value.trim();\n        c.em = $('#cEm') ? $('#cEm').value.trim() : '';")

    # 2. Update loadCfg
    text = text.replace("if ($('#cYT')) $('#cYT').value = c.yt || '';",
                        "if ($('#cYT')) $('#cYT').value = c.yt || '';\n        if ($('#cEm')) $('#cEm').value = c.em || '';")

    # 3. Fix WhatsApp formatting inside sendWA()
    old_wa = """        let msg = `🛒 *NUEVO PEDIDO - FRANELAS VE*\\n`;
        msg += `━━━━━━━━━━━━━━━━━━━━\\n`;
        msg += `👤 *Cliente:* ${nm}\\n`;
        msg += `📱 *Teléfono:* ${ph}\\n`;
        msg += `🏙️ *Ubicación:* ${ci}\\n`;
        msg += `━━━━━━━━━━━━━━━━━━━━\\n`;
        msg += `📦 *DETALLE DEL PEDIDO:*${pedido}\\n`;
        msg += `━━━━━━━━━━━━━━━━━━━━\\n`;
        if (isMay) msg += `🏷️ *BENEFICIO MAYORISTA APLICADO*\\n`;
        msg += `💰 *TOTAL A PAGAR: ${fp(total)}*\\n`;
        msg += `━━━━━━━━━━━━━━━━━━━━\\n`;
        msg += `💳 *Pago:* ${pay.value}\\n`;
        msg += `📦 *Envío:* ${ship.value}\\n`;
        msg += `🚚 *Entrega:* ${del2.value}\\n`;"""

    new_wa = """        let msg = `HOLA! HICE MI PEDIDO POR LA PAGINA, MI NOMBRE ES ${nm}\\n\\n`;
        msg += `MI PEDIDO ES:${pedido}\\n\\n`;
        msg += `MONTO A CANCELAR EXPRESADO EN DOLARES : ${fp(total)} DOLARES O TASA BCV DEL DIA\\n\\n`;
        msg += `METODO DE PAGO: ${pay.value}\\n\\n`;
        msg += `FORMA DE RETIRO: ${del2.value}`;"""
    
    # 3.5 Fix inside cart.forEach iterator for the format
    text = text.replace("pedido += `\\n   - Diseño: ${it.design.code} (${it.design.nm})`;", 
                        "pedido += `\\n   - DISEÑO: DE CATALOGO CODIGO: ${it.design.code}`;")
    text = text.replace("pedido += `\\n   - [DISEÑO PROPIO]`;", 
                        "pedido += `\\n   - DISEÑO PERSONALIZADO`;")
                        
    text = text.replace(old_wa, new_wa)

    # 4. Fix applyCfg for Social Icons and Relaciones Comerciales
    # Add Relaciones comerciales to flg if it's index.html
    if 'index.html' in filename:
        text = text.replace('<a href="#faq">Ayuda / FAQ</a>\n                    <a href="javascript:void(0)" id="footerAdmBtn">Panel de Control</a>',
                            '<a href="#faq">Ayuda / FAQ</a>\n                    <a href="javascript:void(0)" onclick="SHOP.goEmail()" id="relComBtn">Relaciones Comerciales</a>\n                    <a href="javascript:void(0)" id="footerAdmBtn">Panel de Control</a>')
        
    old_applyCfg_socials = """        const socials = [];
        if (c.ig) socials.push({ u: c.ig, l: 'Instagram' });
        if (c.fb) socials.push({ u: c.fb, l: 'Facebook' });
        if (c.tk) socials.push({ u: c.tk, l: 'TikTok' });
        if (c.yt) socials.push({ u: c.yt, l: 'YouTube' });

        const socCont = $('#socIc');
        if (socCont) {
            socCont.innerHTML = socials.map(s => `
                    <a href="${s.u}" target="_blank" class="sic" title="${s.l}">${s.l.substring(0, 2)}</a>
                `).join('');
        }"""
        
    new_applyCfg_socials = """        const socials = [];
        if (c.ig) socials.push({ u: c.ig, l: 'Instagram', ic: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>' });
        if (c.fb) socials.push({ u: c.fb, l: 'Facebook', ic: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>' });
        if (c.tk) socials.push({ u: c.tk, l: 'TikTok', ic: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a3 3 0 0 1-3-3v11a7 7 0 1 1-7-7z"></path></svg>' });
        if (c.yt) socials.push({ u: c.yt, l: 'YouTube', ic: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>' });
        if (c.em) socials.push({ u: 'mailto:' + c.em, l: 'Email', ic: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>' });

        const socCont = $('#socIc');
        if (socCont) {
            socCont.innerHTML = socials.map(s => `
                    <a href="${s.u}" target="_blank" class="sic" title="${s.l}">${s.ic}</a>
                `).join('');
        }"""
        
    text = text.replace(old_applyCfg_socials, new_applyCfg_socials)

    # Also inject the goEmail method in SHOP
    # Find openShare() and inject goEmail() before it
    text = text.replace('openShare() {', '''goEmail() {
        const c = ADM.gC();
        const em = c.em || 'contacto@franelasve.com';
        window.location.href = 'mailto:' + em;
    },
    openShare() {''')

    # 5. Fix $$('.sdt-btn')[0]
    text = text.replace("$('.sdt-btn')[0].classList.add('on');", "$$('.sdt-btn')[0].classList.add('on');")

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(text)

modify_file('index.html')
modify_file('app.js')
print("Changes applied!")
