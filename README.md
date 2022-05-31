# web_scrap
## Intall all dependecy using `npm install`
## Need to install redis server on local machine to run this application
## Run the application using `npm run start`
## API route - http:localhost:3000/nodejs parameter are location, page, pageItem

## Example of data response - localhost:3000/nodejs?location=Bengaluru&page=4

{
    "error": false,
    "message": "Data for job_data from the cache",
    "data": {
        "page": "4",
        "per_page": 10,
        "pre_page": 3,
        "next_page": "41",
        "total": 52,
        "total_pages": 6,
        "data": [
            {
                "job_title": "Node.js Application Developer",
                "company_name": "Accenture",
                "location": " India , Bengaluru / Bangalore",
                "years_of_exp_req": " 4-6 years",
                "salary": " Not Specified",
                "post_time": "Posted: 9 days ago "
            },
            {
                "job_title": "Sr. Associate - Projects",
                "company_name": "Cognizant Technology Solutions India Pvt Ltd",
                "location": " India , Bengaluru / Bangalore",
                "years_of_exp_req": " 11-15 years",
                "salary": " Not Specified",
                "post_time": "Posted: 4 days ago "
            },
            {
                "job_title": "Sr Software Engineer",
                "company_name": "GE Healthcare",
                "location": " India , Bengaluru / Bangalore",
                "years_of_exp_req": " 7-10 years",
                "salary": " Not Specified",
                "post_time": "Posted: 3 days ago "
            },
            {
                "job_title": "Software Engineer",
                "company_name": "GE Healthcare",
                "location": " India , Bengaluru / Bangalore",
                "years_of_exp_req": " 4-7 years",
                "salary": " Not Specified",
                "post_time": "Posted: 5 days ago "
            },
            {
                "job_title": "Staff Software Engineer",
                "company_name": "GE Healthcare",
                "location": " India , Bengaluru / Bangalore",
                "years_of_exp_req": " 10-13 years",
                "salary": " Not Specified",
                "post_time": "Posted: 5 days ago "
            },
            {
                "job_title": "Node.JS Developer",
                "company_name": "TATA Consultancy Services Ltd.",
                "location": " Bengaluru / Bangalore , Delhi",
                "years_of_exp_req": " 6-12 years",
                "salary": " Not Specified",
                "post_time": "Posted: 10 days ago "
            },
            {
                "job_title": "Node JS Architect",
                "company_name": "TATA Consultancy Services Ltd.",
                "location": " Bengaluru / Bangalore , India",
                "years_of_exp_req": " 5-14 years",
                "salary": " Not Specified",
                "post_time": "Posted: 11 days ago "
            },
            {
                "job_title": "Senior Software Engineer - Fullstack Sr. Developer",
                "company_name": "GE Healthcare",
                "location": " Bengaluru / Bangalore , India",
                "years_of_exp_req": " 4-7 years",
                "salary": " Not Specified",
                "post_time": "Posted: 7 days ago "
            },
            {
                "job_title": "Sr Enterprise Architect",
                "company_name": "Honeywell",
                "location": " Bengaluru / Bangalore",
                "years_of_exp_req": " 6-9 years",
                "salary": " Not Specified",
                "post_time": "Posted: 10 days ago "
            },
            {
                "job_title": "NodeJS",
                "company_name": "TATA Consultancy Services Ltd.",
                "location": " Bengaluru / Bangalore , India",
                "years_of_exp_req": " 1-6 years",
                "salary": " Not Specified",
                "post_time": "Posted: 11 days ago "
            }
        ]
    }
}
