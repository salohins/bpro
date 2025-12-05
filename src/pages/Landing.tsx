export default function Landing() {
    const subscribe = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/create-checkout`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        price_id: import.meta.env.VITE_STRIPE_PRICE_ID
                    }),
                }
            );

            const data = await res.json();

            if (!data.url) {
                alert("Stripe error: " + JSON.stringify(data));
                return;
            }

            // Redirect user to Stripe Checkout
            window.location.href = data.url;
        } catch (err) {
            alert("Unexpected error: " + err);
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4">
            <h1 className="text-4xl font-bold mb-6">Subscription App</h1>

            <button
                onClick={subscribe}
                className="px-8 py-4 bg-black text-white rounded text-lg"
            >
                Subscribe
            </button>
        </div>
    );
}
