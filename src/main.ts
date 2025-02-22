import { Form } from './components/Form';
import { Header } from './components/Header';
import { Logo } from './components/Logo';
import { Footer } from './components/Footer';
import { LoadingSpinner } from './components/LoadingSpinner';
// Importing the styles
import '../styles/styles.css';
import 'animate.css';

const spinner = new LoadingSpinner();
spinner.show();

window.addEventListener('load', () => {
    spinner.hide();
});

const app = document.getElementById("app");
if (app) {
    const header = new Header();
    app.appendChild(header.render());

    const logo = new Logo();
    app.appendChild(logo.render());

    const registrationForm = new Form();
    app.appendChild(registrationForm.render());

    const footer = new Footer();
    document.body.appendChild(footer.render());
}