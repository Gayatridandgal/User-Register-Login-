if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = Object.fromEntries(new FormData(form).entries());

        // Simple client-side validation
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) {
                console.error(result);
                alert(result.error || (result.errors && result.errors[0].msg));
            } else {
                alert("Registered successfully");
                window.location.href = "index.html";
            }
        } catch (err) {
            console.error("Request failed:", err);
            alert("Something went wrong. Check console.");
        }
    });
}
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(loginForm).entries());

        try {
            const response = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("Login failed:", result);
                alert(result.error || result.errors?.[0]?.msg || "Login failed");
            } else {
                alert(result.message); // ✅ Show "Login successful"
                // redirect if needed: window.location.href = "dashboard.html";
            }
        } catch (err) {
            console.error("Fetch error:", err);
            alert("Something went wrong. Check console.");
        }
    });
}

