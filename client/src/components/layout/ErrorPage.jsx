import { useNavigate } from "react-router-dom"

export const ErrorPage = () => {

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    }

    return <>
         <section className="error-section">
            <div id="error-text">
              <figure>
                <img
                  src="https://cdn.dribbble.com/users/722246/screenshots/3066818/404-page.gif"
                  alt="404 page"
                  style={{
                    width: '70%', height: 'auto'
                  }}
                />
              </figure>
              <div className="text-center">
                <p className="p-a">
                  . The page you were looking for could not be found
                </p>
                <p className="p-b">... Back to previous page</p>
              </div>
            </div>
            
            {/* <NavLink to="/" className="btn">Go Back To Home Page</NavLink> */}

            <button type="submit" className="btn" onClick={handleGoBack}>Go Back</button>
          </section>

    </>
}