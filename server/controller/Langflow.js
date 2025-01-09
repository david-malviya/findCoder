const runFlow = async (req, res) => {
    
    const {message} = req.body
    const apiUrl = `${process.env.BASE_API_URL}/lf/${process.env.LANGFLOW_ID}/api/v1/run/${process.env.ENDPOINT}`;
    const payload = {
        input_value: message,
        output_type: "chat",
        input_type: "chat",
    };
    const headers = {
        Authorization: `Bearer ${process.env.APPLICATION_TOKEN}`,
        "Content-Type": "application/json",
    };

    try {
        console.log("started");
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(
                `${response.status} ${response.statusText} - ${JSON.stringify(errorDetails)}`
            );
        }

        const data = await response.json();
        console.log(data.outputs[0].outputs);
        
        return res.status(200).json(data.outputs[0].outputs[0].results.message.text);
    } catch (error) {
        console.error("Error calling API:", error.message);
        throw error;
    }
}

export {runFlow};