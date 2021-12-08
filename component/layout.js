import React from 'react'

export default function(props) {
	let { posts, children} = props
	
	console.log(children)
	/*for (i of children){
		console.log(i)
	}*/
	
	
	console.log("--- ", children.length)
	children = React.Children.map(children, (child) => 
          React.cloneElement(child, {
              className: `${child.props.className} img-special-class`
            })
        )
	
	

	return children
}