import { Mail, Github, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-transparent border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Mohamad Rafeeq Haiqal Bin Mazri. All rights reserved.
          </p>

          <div className="flex space-x-4">
            <a
              href="mailto:oxbbn123@gmail.com"
              target="_blank"
              className="text-neutral-500 hover:text-white transition-colors"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://github.com/FeeqHai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="www.linkedin.com/in/rafeeq-haiqal-a187a624b"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
