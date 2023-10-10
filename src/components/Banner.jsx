const Banner = ({ title }) => (
    <div className="banner">
        <img id="banner-image" src="../books-notes-student-svgrepo-com.svg" className="App-logo" alt="logo" />
        <h1 style={{color: 'black'}}>{title}</h1>
    </div>
);

export default Banner;