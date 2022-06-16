function removeDraft(campaign_key) {
  console.log("from remove ", campaign_key);
  if (!window.confirm("are you sure to remove this draft?")) {
    console.log("no");
  } else {
    console.log("yes");
    //now i will send request to delete the campaign from scheduling and save as draafts
    var cdetails = {
      campaign_key: `${campaign_key}`,
    };
    console.log(cdetails);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(cdetails),
    };
    // api for making post requests
    let fetchRes = fetch("/Remove-Draft", options);
    fetchRes
      .then((res) => res.json())
      .then((d) => {
        console.log(d);
        if (d.response_status == "1") {
          document.location.reload(true);
        } else {
          window.alert(
            "Can not remove this campaign Now , due to server error"
          );
        }
      });
  }
}

