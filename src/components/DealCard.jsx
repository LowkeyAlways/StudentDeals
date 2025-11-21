import React from 'react'
import { FaRegCommentDots, FaShareAlt, FaBookmark } from 'react-icons/fa'

function DealCard({
	title = '',
	price = '',
	oldPrice = '',
	discount = '',
	source = '',
	description = '',
	votes = 0,
	image = null,
	url = '#',
  compact = false,
  featured = false,
}) {
	return (
		<article className={`deal-card ${compact ? 'compact' : ''} ${featured ? 'featured' : ''}`}>
				<div className="deal-image">
				{image ? (
					<img src={image} alt="thumbnail" />
				) : (
					<div className="deal-image-placeholder" />
				)}

					{discount && (
						<span className="discount-badge">{discount}</span>
					)}
			</div>

			<div className="deal-content">
				<div className="deal-top">
					<div className="votes">{votes}°</div>
					<div className="meta-right">Posté il y a 2 h</div>
				</div>

				<h3 className="deal-title">{title}</h3>

				<div className="deal-price-row">
					<div className="price">{price} <span className="old-price">{oldPrice}</span></div>
					{discount && <div className="discount">{discount}</div>}
				</div>

				{source && (
					<div className="deal-source">Dispo. chez <strong>{source}</strong></div>
				)}

				{description && <p className="deal-desc">{description}</p>}

				<div className="deal-actions">
					<div className="icons">
						<button className="icon" aria-label="comments"><FaRegCommentDots /></button>
						<button className="icon" aria-label="share"><FaShareAlt /></button>
						<button className="icon" aria-label="save"><FaBookmark /></button>
					</div>

					<a className="deal-cta" href={url} target="_blank" rel="noreferrer">Voir le deal</a>
				</div>
			</div>
		</article>
	)
}

export default DealCard
