import React from 'react';
import '../styles/footer.css';
import footLogo from '../../public/assets/images/footlogo.svg?url';

function ScanFooter () {
    const text = 'г. Москва, Цветной б-р, 40 \n\
                                +7 495 771 21 11 \n\
                                info@skan.ru'
    return (
        <footer className="footer">
            <img src={footLogo} />
            <div className="text">
                <span className='adress'>{text}</span><br />
                <span className="copy">Copyright. 2022</span>
            </div>
        </footer>
    )
}

export default ScanFooter;