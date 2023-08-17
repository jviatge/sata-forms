wp.blocks.registerBlockType("makeupnamespace/make-up-block-name", {
  title: "Brads Boilerplate Block",
  icon: "welcome-learn-more",
  category: "common",
  attributes: {
    title: { type: "string" },
    api_url: { type: "string" },
    token_auth: { type: "string" }
  },
  edit: EditComponent,
  save: function () {
    return null
  }
})

function EditComponent(props) {

  function updateTitle(e) {
    props.setAttributes({ title: e.target.value })
  }

  function updateApiUrl(e) {
    props.setAttributes({ api_url: e.target.value })
  }

  function updateTokenAuth(e) {
    props.setAttributes({ token_auth: e.target.value })
  }

  return (
    <div className="my-unique-plugin-wrapper-class">
      <div className="bg-blue-200 border border-blue-300 rounded-md p-5">

        <div className="flex flex-col">
          <label>Title</label>
          <input 
            className="mr-3 p-2" 
            type="text" 
            value={props.attributes.title} 
            onChange={updateTitle} 
            placeholder="My form api" />
        </div>

        <div className="flex flex-col">
          <label>Api url</label>
          <input 
            className="mr-3 p-2" 
            type="text" 
            value={props.attributes.api_url} 
            onChange={updateApiUrl} 
            placeholder="https://my-web_site/api/endpoint" />
        </div>

        <div className="flex flex-col">
          <label>Base endpoint</label>
          <input 
            className="mr-3 p-2" 
            type="text" 
            value={props.attributes.token_auth} 
            onChange={updateTokenAuth} 
            placeholder="" />
        </div>

      </div>
    </div>
  )
}
