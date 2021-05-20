import React from 'react'

function Footer() {
    return (
        <footer>
            <div>
                <h3>Contact</h3>
                <p><span>Number - </span>(+47) 12 34 56 78</p>
                <p><span>Address - </span>Somewhere street 12</p>
                <p><span>Mail - </span>mail@mail.com</p>
                <p><span>Owner - </span>Christian Larsen</p>

            </div>
            <div>
                <h3>Sosial Media</h3>
                <p>Tag us in your instagram photos with the <b>#holidaze.</b></p>
                <p>Visit our instagram, and see all the beautiful establishments.</p>
                <a target="blank" href="https://www.instagram.com/"><i class="fab fa-instagram"></i></a>
            </div>
            <div className="copyright">
                <h6>Final exam project christian larsen at noroff 2021</h6>
            </div>
        </footer>
    )
}

export default Footer
