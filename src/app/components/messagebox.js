"use client";

export default function MessageBox({message}) {
    return (
      <div style={{
            ...styles.container, 
            ...(message.role === "user" 
                ? styles.userContainer 
                : styles.aiContainer)
        }}>
        <p style={
            message.role === "user" 
                ? styles.userText 
                : styles.aiText
        }>{message.content}</p>
      </div>
    );
}

const styles = {
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: "10px",
    },
    userContainer: {
        justifyContent: "flex-end",
    },
    aiContainer: {
        justifyContent: "flex-start",
    },
    userText: {
        color: "#000",
        backgroundColor: "#e4eaf3",
        borderRadius: "20px",
        padding: "20px",
        margin: "20px",
    },
    aiText: {
        color: "#000",
        backgroundColor: "transparent",
        borderRadius: "20px",
        padding: "20px",
        margin: "20px",
    },
}