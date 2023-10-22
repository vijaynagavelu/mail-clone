export default function Footer() {
    return (

        <footer>

            <div className="footerContents">
                <h3>The Basics</h3>
                <ul>
                    <li><a href="/about">About TMDB</a></li>
                    <li><a href="/about/staying-in-touch">Contact Us</a></li>
                    <li><a href="/talk">Support Forums</a></li>
                    <li><a href="/documentation/api">API</a></li>
                    <li><a href="https://status.themoviedb.org/" target="_blank" rel="noopener noreferrer">System Status</a></li>
                </ul>
            </div>

            <div className="footerContents">
                <h3>Get Involved</h3>
                <ul>
                    <li><a href="/bible"><span class="glyphicons glyphicons-asterisk"></span> Contribution Bible</a></li>
                    <li><a href="/movie/new">Add New Movie</a></li>
                    <li><a href="/tv/new">Add New TV Show</a></li>
                </ul>
            </div>

            <div className="footerContents">
                <h3>Community</h3>
                <ul>
                    <li><a href="/documentation/community/guidelines">Guidelines</a></li>
                    <li><a href="/discuss">Discussions</a></li>
                    <li><a href="/leaderboard">Leaderboard</a></li>
                    <li><a href="https://twitter.com/themoviedb" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                </ul>
            </div>

            <div className="footerContents">
                <h3>Legal</h3>
                <ul>
                    <li><a href="/documentation/website/terms-of-use">Terms of Use</a></li>
                    <li><a href="/documentation/api/terms-of-use">API Terms of Use</a></li>
                    <li><a href="/privacy-policy">Privacy Policy</a></li>
                </ul>
            </div>

        </footer>
    )
}