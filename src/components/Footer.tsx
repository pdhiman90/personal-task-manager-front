
function Footer({ isDark, aboutText, quickLinks, socialLinks }:any) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About TaskManager</h3>
          <p className="text-sm">{aboutText}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link:any) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-sm hover:${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <i className={`fas ${link.icon} mr-2`}></i>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            {socialLinks.map((social:any) => (
              <a
                key={social.href}
                href={social.href}
                className={`hover:${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <i className={`fab fa-${social.icon} text-xl`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm">
        <p>© 2025 TaskManager. All rights reserved.</p>
      </div>
    </div>
  );
}



export default Footer;