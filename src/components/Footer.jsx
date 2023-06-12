import React from 'react'
import './style/Footer.scss'

export default function Footer() {
  return (
    <>
        <footer class="bg-dark text-light p-5">
            <div class="footerContainer">
                <div class="row">
                    <div className="col d-flex justify-content-center">
                        <h1>FYP Project</h1>
                    </div>
                </div>
                <div class="text-center my-3">
                    <p>&copy; 2023 My Website. All Rights Reserved.</p>
                </div>
            </div>
        </footer>

    </>
  )
}
