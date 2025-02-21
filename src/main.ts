// filepath: /c:/Users/ahuevo nice/Desktop/Salamah Clone/src/main.ts
import { Form } from './components/Form';
//importing yhr styyle
import '../styles/styles.css';


const app = document.getElementById("app");
if (app) {
    const registrationForm = new Form();
    app.appendChild(registrationForm.render());
}