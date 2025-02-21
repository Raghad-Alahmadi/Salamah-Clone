import { Form } from './components/Form';
import { Header } from './components/Header';
import { Logo } from './components/Logo';
import { Footer } from './components/Footer';
//importing the styles
import '../styles/styles.css';


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