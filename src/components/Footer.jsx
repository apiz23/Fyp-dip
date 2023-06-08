import React from 'react'
import './style/Footer.scss'

export default function Footer() {
  return (
    <>
        <footer class="bg-dark text-light p-5">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <h3>About Us</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div class="col-md-6">
                        <h3>Connect With Us</h3>
                        <ul class="list-unstyled">
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Instagram</a></li>
                        </ul>
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
