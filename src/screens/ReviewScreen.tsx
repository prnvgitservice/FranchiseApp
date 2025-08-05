import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createCompanyReview } from "../api/apiMethods"; // Adjust path as needed
import AsyncStorage from "@react-native-async-storage/async-storage";

const FranchiseReviewScreen: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("Anonymous");
  const [userId, setUserId] = useState<string>("");
  const [role, setRole] = useState<"user" | "technician">("user");

  // Fetch user info (simulate localStorage user)
  useEffect(() => {
    const fetchUser = async () => {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        setUsername(user.username || "Anonymous");
        setUserId(user.id || "");
        // Only allow "user" or "technician"
        setRole(user.role === "technician" ? "technician" : "user");
      }
    };
    fetchUser();
  }, []);

  const validateInputs = (): string | null => {
    if (!rating) return "Please select a rating (1-5 stars).";
    if (!comment.trim()) return "Please provide a comment.";
    if (comment.length > 500) return "Comment cannot exceed 500 characters.";
    return null;
  };

  const handleReviewSubmit = async () => {
    setError(null);
    setLoading(true);

    if (!userId) {
      setError("You must be logged in to submit a review.");
      setLoading(false);
      return;
    }

    const inputError = validateInputs();
    if (inputError) {
      setError(inputError);
      setLoading(false);
      return;
    }

    const reviewData = {
      franchiseId: userId,
      role, // "user" or "technician"
      rating,
      comment: comment.trim(),
    };

    try {
      const response = await createCompanyReview(reviewData);
      if (response?.success) {
        Alert.alert("Thank you for your review!");
        setRating(0);
        setComment("");
      } else {
        throw new Error(
          response?.error?.[0] || response?.message || "Failed to submit review."
        );
      }
    } catch (err: any) {
      let errorMessage = "An error occurred. Please try again.";
      if (err.response?.status === 401) {
        errorMessage = "Unauthorized. Please log in again.";
      } else if (err.response?.status === 400) {
        errorMessage = err.response?.data?.error?.[0] || "Invalid review data.";
      } else if (err.response?.status === 429) {
        errorMessage = "Too many requests. Please try again later.";
      } else if (err.response?.status >= 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (err.message?.includes("Network Error")) {
        errorMessage = "Network error. Please check your connection.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      contentContainerStyle={{ padding: 24, paddingBottom: 32 }}
    >
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold text-gray-700">
          💥 Franchise Review
        </Text>
      </View>

      <View className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        {error && (
          <Text className="text-red-600 text-sm text-center bg-red-50 p-2 rounded mb-4">
            {error}
          </Text>
        )}
        <View className="flex-col gap-6">
          {/* Name */}
          <View>
            <Text className="text-lg font-medium text-gray-700 mb-2">Name</Text>
            <TextInput
              className="p-3 border border-gray-300 rounded-lg bg-gray-100"
              value={username}
              editable={false}
              style={{ fontSize: 16 }}
              accessibilityLabel="Name input"
            />
          </View>

          {/* Rating */}
          <View className="bg-white p-4 rounded-xl shadow-sm">
            <Text className="text-lg font-medium text-gray-700 mb-2">Rating</Text>
            <View className="flex-row justify-center" style={{ gap: 8 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                  activeOpacity={0.7}
                  accessibilityLabel={`Rate ${star} star${star > 1 ? "s" : ""}`}
                >
                  <Ionicons
                    name={star <= rating ? "star" : "star-outline"}
                    size={40}
                    color={star <= rating ? "#facc15" : "#d1d5db"}
                    style={
                      star <= rating
                        ? { backgroundColor: "#fef9c3", borderRadius: 8 }
                        : {}
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Comment */}
          <View>
            <Text className="text-lg font-medium text-gray-700 mb-2">Comment</Text>
            <TextInput
              className="p-3 border border-gray-300 rounded-lg"
              multiline
              numberOfLines={4}
              placeholder="Write your review here..."
              value={comment}
              onChangeText={setComment}
              style={{ fontSize: 16, textAlignVertical: "top" }}
              accessibilityLabel="Comment input"
              maxLength={500}
            />
          </View>

          {/* Submit Button */}
          <View className="flex-row justify-end">
            <TouchableOpacity
              className="px-6 py-3 bg-blue-600 rounded-xl shadow-sm flex-row items-center"
              activeOpacity={0.7}
              onPress={handleReviewSubmit}
              accessibilityLabel="Submit review"
              disabled={loading}
            >
              {loading && (
                <ActivityIndicator size="small" color="#fff" className="mr-2" />
              )}
              <Text className="text-base font-medium text-white">
                {loading ? "Submitting..." : "Submit"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FranchiseReviewScreen;