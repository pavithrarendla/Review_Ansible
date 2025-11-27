# Ticket Booking Web App

A full-stack **Ticket Booking Application** built with **React + TailwindCSS** (frontend) and **Spring Boot** (backend). Users can browse events, view details, and book tickets. The backend manages seat availability and stores bookings securely.

---

## Features

* View a list of events with details (title, venue, date, price, seats available).
* Book tickets with customer details (name, email, seats).
* Backend ensures seat availability before confirming.
* Responsive UI with TailwindCSS.
* REST API with Spring Boot + JPA + H2 (in-memory database).
* Easy to extend with authentication, payments, or admin dashboard.
<<<<<<< HEAD

---

## Tech Stack

**Frontend:** React (Vite), TailwindCSS, Axios
**Backend:** Spring Boot, Spring Data JPA, H2 Database
**Build Tools:** npm, Maven

---

## Project Structure

```
SDP-CICD-B/                 # Spring Boot backend
SDP-CICD-F/                 # React + Vite + Tailwind frontend
SDP-FULLSTACK/              # Fullstack or shared configuration
```

---

## Getting Started

### Backend (Spring Boot)

```bash
cd SDP-CICD-B
mvn spring-boot:run
```

Backend runs on **[http://localhost:8080](http://localhost:8080)**

### Frontend (React)

```bash
cd SDP-CICD-F
npm install
npm run dev
```

Frontend runs on **[http://localhost:5173](http://localhost:5173)**

---

## API Endpoints

* `GET /api/events` → list all events
* `GET /api/events/{id}` → get event details
* `POST /api/bookings` → create a booking

---

## Screenshots (Sample)

* Event list page
* Booking form modal
* Booking confirmation

*(Add screenshots/gifs here once UI is running)*

---

## Future Improvements

* User authentication (JWT)
* Payment integration (Stripe/PayPal)
* Admin dashboard for event management
* PostgreSQL + Flyway for production

---

## License

MIT License. Free to use and modify.

---

### Author

Built with React & Spring Boot.
=======
>>>>>>> manager-pavithra
