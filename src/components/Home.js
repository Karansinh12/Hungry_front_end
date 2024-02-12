import React from 'react';

const Home = () => {

    const styles = {
        bannerContainer: {
            position: 'relative',
            width: '100%',
            height: 500,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        bannerStyle: {
            position: 'absolute',
            backgroundImage: 'url("https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%',
            zIndex: -1,
            opacity: 0.8,
        },
        bannerHeading: {
            position: 'absolute',
            fontSize: '120px',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            textAlign: 'center',
        },
        aboutUsContainer: {
            display: 'flex',
            alignItems: 'center',
            padding: '20px',
            marginBottom:'80px',
        },
        aboutUsImage: {
            flex: 1,
            maxWidth: '50%',
            padding: '20px',
        },
        aboutUsText: {
            flex: 1,
            padding: '20px',
            textAlign: 'justify',
        },
        typesOfFoodContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            textAlign: 'center',
            background: '#212124',
            marginTop:'40px',
            marginBottom:'40px',
        },
        foodHeading: {
            fontSize: '24px',
            margin: '20px 0',
            color: '#fff'
        },
        foodImageContainer: {
            display: 'flex',
            justifyContent: 'center',
        },
        foodImage: {
            width: '300px',
            height: '200px',
            margin: '10px',
        },
        viewMenuContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            textAlign: 'center',
        },
        viewMenuHeading: {
            fontSize: '24px', 
            margin: '20px 0', 
        },
        viewMenuButton: {
            backgroundColor: '#212124', 
            color: 'white', 
            fontSize: '18px', 
            padding: '10px 20px', 
            border: 'none',
            cursor: 'pointer',
        },
        spacer: {
            margin: '60px'
        },

        searchsection:{
          display:'flex',
          justifyContent:'center'
        },
        

        searchContainer: {
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #ccc',
          borderRadius: '200px', 
          padding: '5px',
          marginTop: '10px',
          width: '500px', 
        },
      
        searchInput: {
          flex: '1',
          border: 'none',
          outline: 'none',
          padding: '5px',
          borderRadius: '20px', 
        },
      
        searchButton: {
          backgroundColor: '#EBB22F',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          padding: '5px 10px',
          cursor: 'pointer',
          marginLeft: '2px',
          width:'100px',
        },
      
        searchButtonHover: {
          backgroundColor: '#45a045', 
        },
    };

    return (
        <section>
            <div style={styles.bannerContainer}>
                <div style={styles.bannerStyle}></div>
                <h1 style={styles.bannerHeading}>Welcome | Bienvenue</h1>
            </div>
            <div>
         <h2>Restaurant List</h2>
         <div className="search-section" style={styles.searchsection}>
         <div className="search-container" style={styles.searchContainer}>
        <input type="text" placeholder="Search by location, cuisine, restaurant name..." style={styles.searchInput}/>
  <button className="search-button" style={styles.searchButton} >Search</button>
</div></div></div>

<div style={styles.typesOfFoodContainer}>
                <h2 style={styles.foodHeading}>Explore by Food Type</h2>
                <div style={styles.foodImageContainer}>
                    <div>
                        <img src="https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2676&q=80" alt="Food Type 1" style={styles.foodImage} />
                        <p style={{ color: 'white' }}>Continental</p>
                    </div>
                    <div>
                        <img src="https://images.unsplash.com/photo-1644778723704-71016c343deb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2672&q=80" alt="Food Type 2" style={styles.foodImage} />
                        <p style={{ color: 'white' }}>Deserts</p>
                    </div>
                    <div>
                        <img src="https://images.unsplash.com/photo-1588269965522-9bd83f3f3f13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" alt="Food Type 3" style={styles.foodImage} />
                        <p style={{ color: 'white' }}>Drinks</p>
                    </div>
                </div>
            </div>
            <div style={styles.aboutUsContainer}>
                <div style={styles.aboutUsImage}>
                    <img src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" alt="About Us" style={{ width: '100%', height: 'auto' }} />
                </div>
                
                <div style={styles.aboutUsText}>
                    <h2>About Us</h2>
                    <p>
                        Welcome to Hungry Hub Restaurant!
                        We are passionate about serving delicious food and providing a memorable dining experience for our guests.
                        Our chefs craft each dish with care, using the finest ingredients to ensure every bite is a delight. From classic favorites to unique culinary creations, we have something to satisfy every palate.
                        Whether you're joining us for a special occasion or a casual meal, we strive to create a warm and inviting atmosphere where you can relax and enjoy great food.
                        Thank you for choosing Hungry Hub Restaurant. We look forward to serving you and making your dining experience exceptional.
                        Bon appétit!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Home;
