package com.example.demo.services;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

@Service
public class OpenGraphService {

    public String extractImageUrl(String targetUrl) {
        if (targetUrl == null || targetUrl.isBlank()) {
            return null;
        }
        try {
            Document doc = Jsoup.connect(targetUrl)
                    .userAgent("Mozilla/5.0 (compatible; StudentDealsBot/1.0)")
                    .timeout(5000)
                    .get();

            String[] selectors = new String[]{
                    "meta[property=og:image:secure_url]",
                    "meta[name=og:image:secure_url]",
                    "meta[property=og:image]",
                    "meta[name=og:image]",
                    "meta[property=twitter:image]",
                    "meta[name=twitter:image]"
            };

            for (String selector : selectors) {
                Element el = doc.selectFirst(selector);
                if (el != null) {
                    String content = el.attr("content");
                    if (isValid(content)) {
                        return content;
                    }
                }
            }

            Element link = doc.selectFirst("link[rel=image_src]");
            if (link != null && isValid(link.attr("href"))) {
                return link.attr("href").trim();
            }

            Element landing = doc.selectFirst("img#landingImage");
            if (landing != null) {
                String landingUrl = extractFromLandingImage(landing);
                if (landingUrl != null) {
                    return landingUrl;
                }
            }
        } catch (Exception ignored) {
        }
        return null;
    }

    private boolean isValid(String value) {
        return value != null && !value.isBlank() && value.startsWith("http");
    }

    private String extractFromLandingImage(Element landing) {
        String hires = landing.attr("data-old-hires");
        if (isValid(hires)) {
            return hires.trim();
        }

        String dynamic = landing.attr("data-a-dynamic-image");
        String dynamicUrl = parseDynamicImage(dynamic);
        if (dynamicUrl != null) {
            return dynamicUrl;
        }

        String src = landing.attr("src");
        if (isValid(src)) {
            return src.trim();
        }

        return null;
    }

    private String parseDynamicImage(String payload) {
        if (payload == null || payload.isBlank()) {
            return null;
        }
        int httpIndex = payload.indexOf("http");
        if (httpIndex == -1) {
            return null;
        }
        int endQuote = payload.indexOf("\"", httpIndex);
        if (endQuote == -1) {
            endQuote = payload.indexOf("'", httpIndex);
        }
        if (endQuote == -1) {
            endQuote = payload.length();
        }
        String candidate = payload.substring(httpIndex, endQuote);
        return isValid(candidate) ? candidate : null;
    }
}

