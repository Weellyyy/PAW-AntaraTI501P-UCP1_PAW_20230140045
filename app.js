require("dotenv").config();
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");
// const db = require("./database/db"); // Tidak perlu di sini
const perpustakaanRoutes = require("./routes/perpustakaan.js");

app.set("view engine", "ejs");
app.set("views", __dirname + "/view");

app.use(expressLayouts);
app.set("layout", "layouts/main");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.render("index", {
        layout: "layouts/main",
     });
});

app.use("/perpustakaan", perpustakaanRoutes);

app.get("/kelolabuku", (req, res) => {
    res.render("kelolabuku", {
        title: "Kelola Buku",
        layout: "layouts/main",
    });
});

app.use((req, res) => {
    res.status(404).send("Halaman tidak ditemukan");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
