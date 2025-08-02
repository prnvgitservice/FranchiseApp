import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const KeyFeaturesScreen: React.FC = () => {
  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      contentContainerStyle={{ padding: 24, paddingBottom: 32 }}
    >
      <View className="mx-auto w-full">
        {/* Header */}
        <Text
          className="text-3xl font-bold text-center text-blue-600 mb-8"
        //   style={{ borderBottomWidth: 2, borderBottomColor: '#1e40af' }}
        >
          Key Features
        </Text>

        {/* No Middlemen Section */}
        <View className="mb-10">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            NO MIDDLEMEN - NO COMMISSIONS
          </Text>
          <Text className="text-lg text-gray-700 leading-relaxed mb-4">
            At PRNV Services, we believe in direct connections between service providers and
            customers. Maximize your earnings by saying goodbye to middlemen and hefty
            commissions!
          </Text>
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Build a Profile Page as Powerful as a Website:
          </Text>
          <View className="flex-col gap-4 mb-4">
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                Showcase your skills, expertise, and service offerings with a captivating profile
                page.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                Show your work through images and videos.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                Improve your position in listings by seniority, ratings, and volume of business.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                Set your prices with the flexible Self-Billing Dashboard.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                Flexible work schedule with intuitive ON/OFF feature.
              </Text>
            </View>
          </View>
          <Text className="text-lg text-gray-700 leading-relaxed mb-4">
            Our platform adapts to your needs, whether part-time or full-time, supporting
            work-life balance.
          </Text>
          <Text className="text-lg font-bold text-gray-900">
            YOU CAN DECIDE YOUR RATES AND ATTRACT MORE CUSTOMERS WITH SPECIAL OFFERS.
          </Text>
        </View>

        {/* Key Features for Professionals */}
        <View className="mb-10">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            KEY FEATURES FOR PROFESSIONALS:
          </Text>
          <View className="flex-col gap-4">
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Professional Enrollment:</Text> Join our platform
                as a skilled technician or service provider.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">No Middlemen No Commissions:</Text> Direct
                connections between professionals and customers without commissions.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Social Media Marketing:</Text> Promoted based on
                ratings, reviews, teamwork, seniority, pin codes served, and volume.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Subscription Renewal:</Text> Renew every 30 days
                to maintain benefits.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Service Area Selection:</Text> Select pin codes
                for targeted reach.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Early Joiner Advantage:</Text> Get listed on top
                for visibility.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Dedicated Profile Page:</Text> Profile page acts
                like a website with scheduling and billing features.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Video Feature:</Text> Highlight your work through
                videos, some of which may be shared on our YouTube channel.
              </Text>
            </View>
          </View>
        </View>

        {/* Key Features for Advertisers */}
        <View className="mb-10">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            KEY FEATURES FOR ADVERTISERS:
          </Text>
          <View className="flex-col gap-4 mb-4">
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Join as an Advertiser:</Text> Promote your
                business via PRNV Services.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Subscription Options:</Text> Advertise within
                chosen pin codes in GHMC limits.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Dedicated Profile Page:</Text> Full business info
                on your own profile page.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Featured Placement:</Text> Featured listings based
                on plan type.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Early Joiner Advantage:</Text> Get listed at the
                top.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Plan Validity and Renewal:</Text> 30-day plans,
                renewable.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Additional Digital Marketing:</Text> Share your
                profile for more visibility.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Refund policy:</Text> No refund applicable.
              </Text>
            </View>
          </View>
          <View
            className="bg-yellow-100 text-yellow-800 p-4 rounded-xl shadow-sm"
            style={{ marginTop: 16 }}
          >
            <Text className="text-base font-medium">
              <Text className="font-semibold">PLEASE NOTE:</Text> THE ABOVE FEATURES ARE SUBJECT
              TO OUR ADVERTISING POLICIES.
            </Text>
          </View>
        </View>

        {/* Key Features for Customers */}
        <View className="mb-10">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            KEY FEATURES FOR CUSTOMERS:
          </Text>
          <View className="flex-col gap-4">
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Commission-Free:</Text> No extra cost to
                customers.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Competitive Pricing:</Text> Enjoy lowest market
                rates.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Rating and Reviews:</Text> Help improve services
                via feedback.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Damage and Work Guarantee:</Text> One-week
                guarantee & damage coverage if customer details are submitted.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">GST Exemption:</Text> Most providers are
                GST-free.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Repeat Hiring:</Text> Hire the same professional
                again.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Choice and Bargaining:</Text> Freedom to choose
                and negotiate.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Refund Policy:</Text> Not applicable for Service
                Providers.
              </Text>
            </View>
          </View>
        </View>

        {/* Business Development Associate */}
        <View className="mb-10">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Why Join as a Business Development Associate (BDA)?
          </Text>
          <Text className="text-lg text-gray-700 leading-relaxed mb-2">
            <Text className="font-semibold">'RECURRING INCOME'</Text> is one of the best
            advantages of the BDA plan...
          </Text>
          <Text className="text-lg text-gray-700 leading-relaxed mb-2">
            <Text className="font-semibold">Example:</Text> If a BDA introduces one technician
            under ₹3000 plan, they'll earn ₹300 on join + renewal.
          </Text>
          <Text className="text-lg text-gray-700 leading-relaxed mb-4">
            Initially small, over time this becomes a great source of recurring income.
          </Text>
          <View
            className="bg-red-100 text-red-800 p-4 rounded-xl shadow-sm"
            style={{ marginTop: 16 }}
          >
            <Text className="text-base font-medium">
              <Text className="font-semibold">NOTE:</Text> BDA monthly fee is non-refundable.
            </Text>
          </View>
        </View>

        {/* Terms and Conditions */}
        <View className="mb-10">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            TERMS AND CONDITIONS:
          </Text>
          <View className="flex-col gap-4 mb-4">
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Commission:</Text> We charge only monthly plan
                fees.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Liability:</Text> Provider is responsible for any
                damages.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Work Guarantee:</Text> 1-week guarantee post work
                completion.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Customer Feedback:</Text> Ratings/reviews
                mandatory for claims.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Compensation:</Text> Provide full details to claim
                any work-related damage.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Seniority and Renewal:</Text> Displayed by
                seniority. Delays lose priority.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Training:</Text> Only computer support is
                provided, not field training.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Verification:</Text> Submit Aadhar, PAN, and
                referrals for activation.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">GST Compliance:</Text> Providers must follow
                applicable GST rules.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Renewal:</Text> Every 30 days. Inactive profiles
                won't show.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Plan Changes:</Text> Switch anytime. No refunds,
                only adjustments.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Profile Management:</Text> Full control of profile
                and content.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Pin Code Changes:</Text> Only during renewal.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">YouTube Exposure:</Text> Best videos get
                highlighted on YouTube.
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-lg text-gray-700">• </Text>
              <Text className="text-lg text-gray-700 leading-relaxed">
                <Text className="font-semibold">Refund Policy:</Text> No refund under any
                condition.
              </Text>
            </View>
          </View>
          <View
            className="bg-blue-100 text-blue-800 p-4 rounded-xl shadow-sm"
            style={{ marginTop: 16 }}
          >
            <Text className="text-base font-medium">
              <Text className="font-semibold">
                Please read and understand these terms before proceeding.
              </Text>{' '}
              By subscribing, you agree to all terms of PRNV Services.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default KeyFeaturesScreen;