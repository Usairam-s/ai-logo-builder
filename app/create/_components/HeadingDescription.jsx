import React from "react";

function HeadingDescription({ main, sub }) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="text-primary text-2xl font-semibold">{main}</h2>
        <h4 className="text-muted-foreground">{sub}</h4>
      </div>
    </>
  );
}

export default HeadingDescription;
